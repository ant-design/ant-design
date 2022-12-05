---
category: Components
subtitle: 包裹组件
group: 其他
title: App
cover: https://gw.alipayobjects.com/zos/bmw-prod/cc3fcbfa-bf5b-4c8c-8a3d-c3f8388c75e8.svg
demo:
  cols: 2
---

新的包裹组件，提供重置样式和提供消费上下文的默认环境。

## 何时使用

- 提供可消费 React context 的 `message.xxx`、`Modal.xxx`、`notification.xxx` 的静态方法，可以简化 useMessage 等方法需要手动植入 `contextHolder` 的问题。
- 提供基于 `.ant-app` 的默认重置样式，解决原生元素没有 antd 规范样式的问题。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/message.tsx">message</code>
<code src="./demo/notification.tsx">notification</code>
<code src="./demo/modal.tsx">modal</code>

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
