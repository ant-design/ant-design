---
order: 6
iframe: 360
title:
  zh-CN: 菜单模式
  en-US: Menu mode
---

## zh-CN

设置 trigger 属性即可开启菜单模式，你可以选择 `hover` 或者 `click` 两种触发方式

## en-US

Setting the trigger can open the menu mode, and you can select `Hover` or `click` to trigger

```tsx
import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <FloatButton.Group shape="square" trigger="click">
    <FloatButton />
    <FloatButton />
    <FloatButton />
  </FloatButton.Group>
);

export default App;
```
