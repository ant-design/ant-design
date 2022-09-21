---
order: 3
iframe: 360
title:
  zh-CN: 多个悬浮按钮组合
  en-US: Group of FloatButton
---

## zh-CN

按钮组合使用时，推荐使用 FloatButton.Group

## en-US

You can customize the style of the button.

```tsx
import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <FloatButton.Group>
    <FloatButton />
    <FloatButton />
    <FloatButton.BackTop />
  </FloatButton.Group>
);

export default App;
```
