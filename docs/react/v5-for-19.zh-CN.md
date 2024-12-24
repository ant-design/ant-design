---
group:
  title: 进阶使用
order: 9
title: React 19 兼容
tag: New
---

<!-- prettier-ignore -->
:::info{title="兼容接口"}
antd v5 默认兼容 React 16 ~ 18 版本，对于 React 19 版本，可以使用以下兼容方法进行适配。
该兼容方式以及接口将在 v6 被移除。
:::

### React 19 兼容问题

Ant Design v5 在 React 19 下会出现以下问题：

- 波纹特效

### 兼容方式

以下方法任选其一，其中优先推荐使用兼容包。

#### 兼容包

#### unstableSetRender

注意：默认情况下，请优先使用兼容包。除非对于 umd、微应用等特殊场景，才使用 `unstableSetRender` 方法。

在 React 19 中，ReactDOM 调整了 `render` 方法的导出方式。因而 antd 无法直接使用 `ReactDOM.render` 方法。为了解决这个问题，我们提供了 `unstableSetRender` 方法，用于设置渲染方法。

```tsx
import { unstableSetRender } from 'antd';
import { createRoot } from 'react-dom/client';

unstableSetRender((node, container) => {
  const root = createRoot(container);
  root.render(node);
  return async () => {
    root.unmount();
  };
});
```
