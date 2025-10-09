---
order: 1
title: React 19 Compatibility
tag: New
---

<!-- prettier-ignore -->
:::info{title="Compatibility Interface"}
antd v5 is compatible with React 16 ~ 18 by default, and most features are also compatible with React 19. A few issues are listed below, and the following compatibility methods can be used for adaptation. This method and interface will be removed in v6.
::::

### React 19 Compatibility Issues

Due to React 19 adjusting the export method of `react-dom`, antd cannot directly use the `ReactDOM.render` method. Therefore, using antd will encounter the following issues:

- Wave effect does not work properly
- `Modal`、`Notification`、`Message` and other components' static methods are invalid (hooks invocation methods are not affected).

Therefore, you need to use a compatibility configuration to make antd work properly in React 19.

### Compatibility Methods

You can choose one of the following methods, and it is recommended to use the compatibility package first.

#### Compatibility Package

Install the compatibility package

<InstallDependencies npm='npm install @ant-design/v5-patch-for-react-19 --save' yarn='yarn add @ant-design/v5-patch-for-react-19' pnpm='pnpm add @ant-design/v5-patch-for-react-19 --save' bun='bun add @ant-design/v5-patch-for-react-19'></InstallDependencies>

Import the compatibility package at the application entry

```tsx
import '@ant-design/v5-patch-for-react-19';
```

#### unstableSetRender

Once again, please use the compatibility package first. Only for special scenarios such as umd, micro-applications, etc., use the `unstableSetRender` method. `unstableSetRender` is a low-level registration method that allows developers to modify the rendering method of ReactDOM. Write the following code at the entry of your application:

```js
import { unstableSetRender } from 'antd';
import { createRoot } from 'react-dom/client';

unstableSetRender((node, container) => {
  container._reactRoot ||= createRoot(container);
  const root = container._reactRoot;
  root.render(node);
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
    root.unmount();
  };
});
```
