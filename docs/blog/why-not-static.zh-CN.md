---
title: 静态方法之痛
date: 2023-04-26
author: zombieJ
zhihu_url: https://zhuanlan.zhihu.com/p/633333904
yuque_url: https://www.yuque.com/ant-design/ant-design/gkkyx81eihftzzq7
---

> `message.success` 用的好好的为什么要 warning 我去用 hooks？antd 越做越垃圾，走好不送！

我们在社交渠道听到了不少关于静态方法转 hooks 的质疑。我们深知这非常痛苦，但是在经过多年的考虑后，我们还是决定在 v5 做一次切割（是的，这个讨论甚至比 hooks 存在还久远，但是在 hooks 之前一直没有简单的实现方式，我们也就一直将其搁置在一边）。

## 静态方法

在 JS 之初，就存在一个简单好用的 API `alert`。你可以在任何时候、任何地方调用它。而到了框架层面，这种便捷同样令人心驰神往。一个常见的例子就是我在 Redux 中，ajax 获取数据失败就调用一下 `message.error` 在屏幕上展示一个错误信息：

<img width="300" alt="Fetch Failed" src="https://user-images.githubusercontent.com/5378891/234574678-44b12d00-9318-4ff9-b234-08129c82fc78.png" />

然而从数据流角度看，这其实耦合了 UI 和 数据层。只是因为其看起来调用时并不直接依赖 UI 上下文，所以它看起来是无害的而已。从测试角度看，这种耦合也会让测试变得复杂。

### Context 丢失之痛

在函数中调用静态方法，虽然看起来存在上下文。但是实际上静态方法并不会消费上下文，它会独立于当前 React 生命周期，因而通过 Context 获取的内容其实什么都得不到：

```tsx
const Context = React.createContext('default');

const MyContent = () => React.useContext(Context);

const Wrapper = () => {
  React.useEffect(() => {
    // Static function is out of context.
    // We can only get `default` instead of `Hello World`.
    message.success(<MyContent />);
  }, []);

  return null;
};

const Demo = () => (
  <Context.Provider value="Hello World">
    <Wrapper />
  </Context.Provider>
);
```

静态方法实现其实是通过独立的 `ReactDOM.render` 来创建一个新的 React 实例，在可以获得任意场景调用的同时也和当前调用者上下文完全无关。所以你很容易就想到，如果我配置了主题、国际化、全局配置等等，那么这些配置都不会生效。

在我说到这里的同时，你可能会反应到：“等等！antd 的静态方法国际化是生效的呀！”

没错，但是这并不是真正的消费了 Context，而是我们做了一个非常 Hack 的实现。当用户通过 ConfigProvider 提供 `locale` 属性时，我们会临时将其存到一个全局变量中。而当静态方法调用时，则使用其进行填充：

```tsx
// Sample. Not real world code.
let globalLocale = null;

const ConfigProvider = (props) => {
  if (props.locale) {
    globalLocale = props.locale;
  }

  // ...
};

Modal.confirm = (props) => {
  // ...

  ReactDOM.render(
    <ConfigProvider locale={globalLocale}>
      <Modal {...modalProps} />
    </ConfigProvider>,
  );
};
```

你可以很容易看出来，这个代码非常不健壮。静态方法其实根本不知道调用层级是什么，它可能是在 ConfigProvider 之内调用，也可能是在之外调用。甚至可能同时存在配置了多个 ConfigProvider 的情况。这种情况下，我们无法也不可能保证静态方法能够正确的获取到当前的配置。

而当我们开始支持动态主题的时候，这个问题就会变得更加明显。在主题中，很容易遇到混合主题的情况。开发者在不同层级调用 Modal、message、notification 它们的样式可能完全不同。

### Hooks

就如上文所述，为了消费 Context。我们调用方法时需要知道当前的节点位置，因而在 v4 中为静态方法引入了对应的 Hooks 方法：

```tsx
const Demo = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const info = () => {
    messageApi.info('Hello, Ant Design!');
  };

  return (
    <>
      {/* Different insert holder position will get different context */}
      {contextHolder}
      <Button type="primary" onClick={info}>
        Display normal message
      </Button>
    </>
  );
};
```

你可以发现，这其实不太方便。对于开发者而言，每个使用的地方都从过去直接调用，变成了需要额外设置注入 Context 节点。而在大多数情况下，过去静态方法的 Context 往往只需要关注国际化、主题等比较稳定的配置。所以我们如果可以有一个地方放置 Holder，其他地方直接复用那就更好了。

#### App

因而在 v5 版本中，我们提供了 App 组件。这个组件本身带有 DOM 结构，会为自节点添加一些重置样式（比如在过去版本被人诟病的全局样式污染，现在只会作用到 App 之下）。同时也为 Modal、message、notification 添加了 ContextHolder。这样开发者在应用最外层添加 App 后，代码中就可以简单的使用它们了：

```tsx
const Demo = () => {
  const { message } = App.useApp();

  React.useEffect(() => {
    message.success('Hello World');
  }, []);

  // ...
};
```

### 最后

从设计角度来说，静态方法是一个非常不好的实现。但是我们深知在业务场景中，静态方法是如此便利、如此好用。即便它有一些“无伤大雅”的缺点，但是它仍然在历史中值得有一席之地。所以我们在思考，是否可以有其他的方式来将这些副作用从组件库中剥离但是同时又可以服务开发者。比如说改进 umi antd 插件，当配置 `appData` 时，自动将顶层的 App 实例静态化到 antd 中。当然，这只是一些想法。我们会在后续的版本中继续探索这个问题。
