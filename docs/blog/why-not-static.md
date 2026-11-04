---
title: Pain of static methods
date: 2023-04-26
author: zombieJ
zhihu_url: https://zhuanlan.zhihu.com/p/633333904
yuque_url: https://www.yuque.com/ant-design/ant-design/gkkyx81eihftzzq7
---

> `message.success` is working well, why do you warn me to use hooks? antd is getting worse and worse, goodbye!

We've heard some complaints about hooks replacement of static methods. We know it's painful, but after years of consideration, we still decide to do a cut in v5 (yes, this discussion is even older than hooks, but there was no simple way to implement it before hooks, so we just put it aside).

## Static methods

For the early JS, there already exists a simple and easy-to-use API `alert`. You can call it anytime, anywhere. And at the framework level, this kind of convenience is also fascinating. A common example is that use `message.error` to display an error message on the screen when the ajax request fails in Redux:

<img width="300" alt="Fetch Failed" src="https://user-images.githubusercontent.com/5378891/234574678-44b12d00-9318-4ff9-b234-08129c82fc78.png" />

But from the perspective of data flow, this actually couples UI and data layer. It just looks like it doesn't directly depend on the UI context when it's called, so it looks harmless. And for the perspective of testing, this kind of coupling also makes the test complicated.

### Pain of context lost

Call static methods in the function, although it looks like there is a context. But in fact, static methods will not consume the context, it will be independent of the current React lifecycle, so the content obtained through Context is actually nothing:

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

Static methods are actually implemented by creating a new React instance through `ReactDOM.render`. So it's completely irrelevant to the current context. So you might think, if I configure the theme, internationalization, global configuration, etc., then these configurations will not take effect.

But when I say this, you may react to: "Wait! The static method of antd internationalization is working!"

Yes, but this is not really consuming the Context. We have done a very Hack implementation. When the user provides the `locale` property through ConfigProvider, we will temporarily store it in a global variable. And when the static method is called, use it to fill in:

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

You can easily find that this code is very fragile. Static methods don't know what the call stack is, it may be called inside or outside the ConfigProvider. Even there may be multiple ConfigProvider configurations at the same time. In this case, we cannot and cannot guarantee that the static method can correctly obtain the current configuration.

When we start to support dynamic theme, this problem will become more obvious. In the theme, it is easy to encounter a mixed theme. The style of Modal, message, notification called by developers at different levels may be completely different.

### Hooks

As we said above, in order to consume context, we need to know the current node position when calling the method. Therefore, in v4, we introduced the corresponding Hooks method for static methods:

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

You can find it's not convenient. For developers, each usage place is directly called from the past, and it becomes must to set the injected Context node. In most cases, the Context of the static method in the past only needs to pay attention to stable configurations such as internationalization and theme. So if we can have a place to put the Holder, it would be better to reuse it directly in other places.

#### App

Thus we provide App component in v5. This component has a DOM structure, which will add some reset styles to the sub-nodes (for example, the global style pollution that was criticized in the past version, now it will only work under App). At the same time, Modal, message, notification holder is also added in App. So after the developer adds App to the outermost layer of the application, it can be used simply in the code:

```tsx
const Demo = () => {
  const { message } = App.useApp();

  React.useEffect(() => {
    message.success('Hello World');
  }, []);

  // ...
};
```

### After All

It's a bad implementation from the design perspective. But we know that static methods are so convenient and easy to use in business scenarios. Even if it has some "harmless" shortcomings, it is still worth having a place in history. So we are thinking, is there any other way to remove these side effects from the component library, but at the same time can also serve developers. For example, improve the umi antd plugin, and automatically static the top-level App instance to antd when configuring `appData`. Of course, these are just some ideas. We will continue to explore this issue in subsequent versions.
