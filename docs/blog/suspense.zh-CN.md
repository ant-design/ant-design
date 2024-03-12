---
title: Suspense 引发的样式丢失问题
date: 2023-07-07
author: zombieJ
---

我们知道，React 18 提供了一个专门为 CSS-IN-JS 使用的 `useInsertionEffect` hooks，它会比 `useLayoutEffect` 拥有更快的时序优先级，从而保证不会因为书写顺序而影响调用顺序的问题：

```tsx
useLayoutEffect(() => {
  console.log('layout effect');
}, []);

useInsertionEffect(() => {
  console.log('insertion effect');
}, []);

// Console:
// - insertion effect
// - layout effect
```

在早期 `@ant-design/cssinjs` 实现中，由于需要兼容 React 17 版本，我们并没有选择 `useInsertionEffect`，而是通过在 render 阶段添加样式的方式来模拟提前插入的效果：

```tsx
// pseudocode. Not used in real world
function useStyleInsertion(hash: string, counter: Record<string, number>) {
  useMemo(() => {
    if (!counter[hash]) {
      // Insert only when current style not inserted
    }

    counter[hash] += 1;
  }, [hash]);

  useEffect(
    () => () => {
      counter[hash] -= 1;

      if (!counter[hash]) {
        // Remove if set to clear on destroy
      }
    },
    [hash],
  );
}
```

以上代码会对使用样式进行统计，如果发现当前样式没有被插入过，就会在 render 阶段插入样式，否则就不会插入。同样的，如果发现当前样式配置了未使用时卸载，则会在 effect 确认计数后清除。此外，还有一套类似的代码会监听 token 的变化，当存在多份 token 时会对不再使用的 token 对应的所有样式 `<style />` 进行清理，以避免过多的主题切换导致的内存泄漏。

这段代码在 React 17 可以完美运行，在 React 18 的 StrictMode 下也运行的十分正常。`counter` 总是成对出现与消失。但是它在 Suspense 下，就会有概率出现问题了。

## StrictMode

React 18 的 StrictMode 和 [React 17](https://17.reactjs.org/docs/strict-mode.html)不同的是，它会在各个阶段进行多次调用，从而确保开发者对 Effect 进行了清理：

```tsx
const My = () => {
  console.log('render');

  useMemo(() => {
    console.log('memo');
  }, []);

  useEffect(() => {
    console.log('effect');

    return () => {
      console.log('effect cleanup');
    };
  }, []);
};

<StrictMode>
  <My />
</StrictMode>;

// Console:
// - render
// - memo
// - render
// - memo
// - effect
// - effect cleanup
// - effect
```

从上面的例子可以知道，`counter` 在 StrictMode 虽然会累加，但是最终会是正确的值（即每个组件只计算 1 次统计）：

- memo: 1
- memo: 2
- effect cleanup: 1

但是 StrictMode 只是对 Suspense 的模拟。在真实场景下，执行次数并不会保证成对出现。

## Suspense

我们使用 [umi](https://github.com/umijs/umi) 进行站点开发，它默认按页拆包、按需加载。通过 Suspense 的方式在加载过程中显示 loading 状态：

```tsx
<BrowserRoutes>
  <Routs>
    <Suspense fallback={<Loading />} />
  </Routs>
</BrowserRoutes>
```

在页面切换时，偶发出现页面往复切换时部分样式丢失的情况：

<img width="300" alt="Fetch Failed" src="https://github.com/ant-design/ant-design/assets/5378891/f2bc49ed-9db6-4d7e-a5d3-8db0cda7b640" />

其中 Page 1 丢失部分的样式为 Page 1 独有的样式（通过 ConfigProvider 定制了一些 token），而 Page 2 的样式则为 Page 1 与 Page 2 通用的样式。

在我们最初介绍的样式管理逻辑可以明白，Page 1 由于为独立 token 对应的样式，因而在 Page 2 渲染时会被清理掉所有的对应 token 的样式 `<style />`。这看起来是符合预期的，那么问题就出在了切回 Page 1 时样式没有被重新插入。

### 计数器错误

在经过一系列断点后，我们发现这个问题出现在计数器不同步之上。由于 Suspense 的特性，它会在加载过程中多次调用组件，所以组件样式注册的时机也会被调用多次。而由于我们的计数器是在 render 阶段进行的，所以在 Suspense 下，计数器会被多次调用，从而导致计数器的值不正确：

- render: 0
- useMemo: 1
- render: 1
- useMemo: 2
- effect: 2
- 不像 StrictMode，effect 并没有再次执行，所以 effect cleanup 也不会执行

计数器不同步导致 token 层面已经认为样式已经没有再使用所以进行了批量清理，而在组件样式层面则认为还有其他组件在使用，所以当重新进入 Page 1 时并不会重新插入样式。

## useInsertionEffect

显而易见，Suspense 由于其特性，我们不能通过 `useMemo` 来做计数器，它不会和 `useEffect` 成对出现。所以我们考虑需要使用 `useInsertionEffect` 来进行样式的插入：

```tsx
// pseudocode. Not used in real world
useInsertionEffect(() => {
  if (!counter[hash]) {
    // Insert only when current style not inserted
  }
  counter[hash] += 1;

  return () => {
    counter[hash] -= 1;

    if (!counter[hash]) {
      // Remove if set to clear on destroy
    }
  };
}, [hash]);
```

而对于 React 17 版本，则降级为 `useLayoutEffect`：

```tsx
const useMergedInsertionEffect = useInsertionEffect || useLayoutEffect;

useMergedInsertionEffect(() => {
  // Same as above
}, [hash]);
```

经过这样的修改后，我们发现 React 17 的 CI 挂了。在检查后，发现 `useLayoutEffect` 就会出现时序问题：

```tsx
// Some logic measure DOM size
useLayoutEffect(() => {
  // This is not correct since style is not applied
  const { clientHeight } = nodeRef.current;
}, []);

// Inject style
useLayoutEffect(() => {
  // ...
}, [hash]);
```

测量的 `useLayoutEffect` 先于注入样式执行，导致获取了错误的尺寸信息。也可以预测到这会对开发者产生影响。因而我们退而求其次，在 React 17 版本时会降级为原先的 `useMemo` 插入。

## 新的兼容问题

在上面的方案中，我们启用了 `useInsertionEffect` 从而完美解决了渲染问题。但在 React 17 及以下版本，我们仍然会在 render 阶段插入样式，但是会在 effect 阶段让引用计数加一。但是这带来了新的问题，我们来看一段代码 ([CodeSandbox](https://codesandbox.io/s/aged-cdn-qjxmpz?file=/src/App.tsx:23-886))：

```tsx
import React from 'react';

const A = () => {
  React.useMemo(() => {
    console.log('A render');
  }, []);

  React.useEffect(() => {
    console.log('A mounted');
    return () => {
      console.log('A unmounted');
    };
  }, []);

  return <div>A</div>;
};

const B = () => {
  React.useMemo(() => {
    console.log('B render');
  }, []);

  React.useEffect(() => {
    console.log('B mounted');
    return () => {
      console.log('B unmounted');
    };
  }, []);

  return <div>B</div>;
};

export default function App() {
  const [show, setShow] = React.useState(true);

  const toggle = () => {
    setShow((prev) => !prev);
  };

  return (
    <div>
      <button onClick={toggle}>toggle</button>
      <div>{show ? <A /> : <B />}</div>
    </div>
  );
}
```

在这段代码（严格模式）中，点击按钮会切换 A 与 B 的渲染。那么从 A 切换到 B 时，顺序会是什么样的呢？答案是:

```
B render
B render
A unmounted
B mounted
B unmounted
B mounted
```

可以看到新组件的渲染是在旧组件的卸载回调之前的。还记得 cssinjs 在 React 17 一下的处理逻辑吗？我们来标记一下：

```
B render      // 写入 cache，插入样式
B render      // 写入 cache，插入样式（虽然是重复的，但是有缓存，不会有冗余）
A unmounted   // **引用计数减一** （此时原本的计数是 1，执行后变为 0，触发了样式卸载）
B mounted     // 引用计数加一 （此时计数是 1，但是样式已经被 A 连带卸载）
B unmounted   // 引用计数减一
B mounted     // 引用计数加一
```

这样就可以发现，当 A 与 B 共用一段样式时，由于计数没有及时更新，导致样式先被卸载了，后续也并没有触发插入逻辑，所以依然会导致丢失。

解决方案也很简单，当计数从 0 变为 1 时，重新插入样式即可。

## 总结

Suspense 在带来渲染能力提升的同时也让时序变得十分重要，仅仅对 StrictMode 进行处理并不是一个最优的方式。针对不同的 React 版本使用不同的逻辑其实会存在不同版本之间的时序问题，`render` 会从父节点到子节点依次触发，而 `useInsertionEffect` 则相反。不过从 antd 角度来说，组件样式之间相互独立，所以这种时序问题并不会对我们产生影响。
