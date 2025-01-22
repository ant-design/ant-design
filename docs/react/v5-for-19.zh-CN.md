---
group:
  title: 进阶使用
order: 9
title: React 19 兼容
tag: New
---

<!-- prettier-ignore -->
:::info{title="兼容接口"}
antd v5 默认兼容 React 16 ~ 18 版本，对于 React 19 版本，可以使用以下兼容方法进行适配。该兼容方式以及接口将在 v6 被移除。
:::

### React 19 兼容问题

由于 React 19 调整了 `react-dom` 的导出方式，导致 antd 无法直接使用 `ReactDOM.render` 方法。因而使用 antd 会遇到以下问题：

- 波纹特效无法正常工作
- `Modal`、`Notification`、`Message` 等组件的静态方法无效

因而需要通过兼容配置，使 antd 在 React 19 中正常工作。

### 兼容方式

以下方法任选其一，其中优先推荐使用兼容包。

#### 兼容包

安装兼容包

<InstallDependencies npm='npm install @ant-design/v5-patch-for-react-19 --save' yarn='yarn add @ant-design/v5-patch-for-react-19' pnpm='pnpm add @ant-design/v5-patch-for-react-19 --save' bun='bun add @ant-design/v5-patch-for-react-19'></InstallDependencies>

在应用入口处引入兼容包

```tsx
import '@ant-design/v5-patch-for-react-19';
```

#### unstableSetRender

再次提醒，默认情况下，请优先使用兼容包。除非对于 umd、微应用等特殊场景，才使用 `unstableSetRender` 方法。`unstableSetRender` 为底层注册方法，允许开发者修改 ReactDOM 的渲染方法。在你的应用入口处写入：

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
