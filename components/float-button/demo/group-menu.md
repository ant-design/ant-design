---
order: 5
iframe: 360
title:
  zh-CN: 菜单模式
  en-US: Menu mode
---

## zh-CN

设置 `trigger` 属性即可开启菜单模式。提供 `hover` 和 `click` 两种触发方式

## en-US

Open menu mode with `trigger`, which could be `hover` or `click`.

```tsx
import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <>
    <FloatButton.Group shape="circle" trigger="click" style={{ right: 24 }}>
      <FloatButton />
      <FloatButton />
      <FloatButton />
    </FloatButton.Group>
    <FloatButton.Group shape="square" trigger="click" style={{ right: 94 }}>
      <FloatButton />
      <FloatButton />
      <FloatButton />
    </FloatButton.Group>
  </>
);

export default App;
```
