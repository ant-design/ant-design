---
order: 4
iframe: 360
title:
  zh-CN: 悬浮按钮组
  en-US: Custom style
---

## zh-CN

悬浮按钮组 (shape = circle)

## en-US

You can customize the style of the button.

```tsx
import React from 'react';
import { FloatButton } from 'antd';

const App: React.FC = () => (
  <FloatButton.Group>
    <FloatButton />
    <FloatButton />
    <FloatButton />
  </FloatButton.Group>
);

export default App;
```
