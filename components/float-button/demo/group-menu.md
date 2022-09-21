---
order: 5
iframe: 360
title:
  zh-CN: 菜单模式
  en-US: Custom style
---

## zh-CN

设置 trigger 属性，即可开启气泡卡片，你可以选择 hover 或者 click 两种触发方式

## en-US

You can customize the style of the button.

```tsx
import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <FloatButton.Group trigger="hover">
    <FloatButton />
    <FloatButton />
    <FloatButton />
  </FloatButton.Group>
);

export default App;
```
