---
category: Components
subtitle: 包裹组件
group: 数据展示
title: App
cover: https://gw.alipayobjects.com/zos/bmw-prod/cc3fcbfa-bf5b-4c8c-8a3d-c3f8388c75e8.svg
demo:
  cols: 2
---

新的包裹组件，提供重置样式和提供消费上下文的默认环境。

## 何时使用

在 v5 版本中，我们推荐通过`hooks`顶层注册的方式代替 `message`,`modal`,`notification` 的静态方法,因为静态方法无法消费上下文,可以通过`App`组件包裹,获取`context`上下文.

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/message.tsx">message</code>
<code src="./demo/modal.tsx">modal</code>
<code src="./demo/notification.tsx">notification</code>

## How to use

```javascript
import React from 'react';
import { App } from 'antd';
const MyPage = () => {
  const { message, notification, modal } = App.useApp();
  message.success('Good!');
  notification.info({ message: 'Good' });
  modal.warning({ title: 'Good' });
  // ....
  // other message,notification,modal static function
  return <div>Hello word</div>;
};

const MyApp = () => (
  <App>
    <MyPage />
  </App>
);
```
