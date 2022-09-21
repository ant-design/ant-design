---
order: 4
iframe: 360
title:
  zh-CN: 自定义按钮组样式
  en-US: Custom style
---

## zh-CN

你可以通过设置 shape 属性自定义悬浮按钮组的样式，悬浮按钮组的 shape 会覆盖内部的 shape 属性

## en-US

You can customize the style of the button.

```tsx
import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <FloatButton.Group shape="square">
    <FloatButton />
    <FloatButton />
    <FloatButton />
  </FloatButton.Group>
);
export default App;
```
