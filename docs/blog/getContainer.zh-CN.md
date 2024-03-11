---
title: getContainer 的一些变化
date: 2022-12-08
author: zombieJ
---

在网页开发中，我们时常会遇到弹出元素的需求，比如 Select 的下拉框、或者是 Modal 组件。直接将其渲染到当前节点下时，可能会被父节点的 `overflow: hidden` 裁剪掉：

<img alt="Overflow" height="200" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Noh-TYJ0BdcAAAAAAAAAAAAADrJ8AQ/original" />

因而在 Ant Design 中，我们默认将其渲染到 `body` 下，但是这又会带来新的问题。由于不在同一个容器下，当用户滚动屏幕时会发现弹出层并未跟随滚动：

<img alt="Scroll" height="370" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*d44KQqkTX90AAAAAAAAAAAAADrJ8AQ/original" />

为了解决这个问题，我们提供了 `getContainer` 属性，让用户可以自定义渲染的容器。`getContainer` 方法会在组件挂载时调用，返回一个容器节点，组件会通过 `createPortal` 渲染到这个节点下。

```tsx
// Fake Code. Just for Demo
const PopupWrapper = () => {
  const eleRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    // It's much complex with timing in real world. You can view the source for more detail:
    // https://github.com/react-component/portal/blob/master/src/Portal.tsx
    const container: HTMLElement = getContainer(eleRef.current);

    // ...
  }, []);

  return (
    <div ref={eleRef}>
      {...}
    </div>
  );
}
```

```tsx
// Fake Code. Just for Demo
const defaultGetContainer = () => {
  const div = document.createElement('div');
  document.body.appendChild(div);
  return div;
};

const SomeComponent = ({ getContainer = defaultGetContainer }) => (
  <PopupWrapper getContainer={getContainer} />
);
```

我们暂时不关注 `getContainer` 需要动态切换挂载节点的需求（其实在过去很长时间它的确也无法切换），仅仅从 React 18 看，它遇到了一些问题。

## React 18 Concurrent Mode

React 18 中，effect 可能会多次触发。为了防止不经意间破坏开发者的行为，在 [StrictMode](https://reactjs.org/docs/strict-mode.html) 下它也做了相应的调整：

> - React mounts the component.
>   - Layout effects are created.
>   - Effect effects are created.
> - React simulates effects being destroyed on a mounted component.
>   - Layout effects are destroyed.
>   - Effects are destroyed.
> - React simulates effects being re-created on a mounted component.
>   - Layout effects are created
>   - Effect setup code runs

简单理解就是 StrictMode 下，即便你的 deps 里是空对象，effect 仍然会多次触发。在切换为 React 18 StrictMode 的时候，我们会发现在 HTML 中会成对出现挂载节点，同时前一个是空的：

```html
<body>
  <div id="root">...</div>

  <!-- Empty -->
  <div className="sample-holder"></div>

  <!-- Real in use -->
  <div className="sample-holder">
    <div className="ant-component-wrapper">...</div>
  </div>
</body>
```

因而我们调整了调用实现，默认的 `getContainer` 也通过 state 进行管理，确保在 StrictMode 下会清理前一个 effect 生成的节点：

```tsx
// Fake Code. Just for Demo
const SomeComponent = ({ getContainer }) => {
  const [myContainer, setMyContainer] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    if (getContainer) {
      setMyContainer(getContainer());
      return;
    }

    const div = document.createElement('div');
    document.body.appendChild(div);
    setMyContainer(div);

    return () => {
      document.body.removeChild(div);
    };
  }, [getContainer]);

  return <PopupWrapper getContainer={() => myContainer} />;
};
```

将 `getContainer` 放入 effect 管理后，我们可以更符合 React 生命周期的方式去管理节点，同时也可以在 `getContainer` 变化时进行清理。从而支持动态改变 `getContainer` 的场景（虽然我个人比较怀疑这种使用场景的普遍性）。

## 最后

由于修复了 `getContainer` 不支持动态改变的问题，它也引入了一个潜在的 breaking change。开发者如果自定义 `getContainer` 每次都是创建新的 DOM 节点时，它就会因为 effect 不断执行，导致节点不断创建而死循环。如果你使用了这种方式并且遇到了问题，需要注意检查。
