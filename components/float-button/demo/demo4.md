---
order: 3
iframe: 360
title:
  zh-CN: 自定义样式
  en-US: Custom style
---

## zh-CN

自定义按钮组的样式

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
