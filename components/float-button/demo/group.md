---
order: 4
iframe: 360
title:
  zh-CN: 浮动按钮组
  en-US: FloatButton Group
---

## zh-CN

按钮组合使用时，推荐使用 FloatButton.Group

## en-US

When multiple buttons are used together，you can use `<FloatButton.Group />`.

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
