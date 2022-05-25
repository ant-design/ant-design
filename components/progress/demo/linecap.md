---
order: 10
title:
  zh-CN: 圆角/方角边缘
  en-US: Square linecaps
---

## zh-CN

通过设定 `strokeLinecap="square|round"` 可以调整进度条边缘的形状。

## en-US

By setting `strokeLinecap="square"`, you can change the linecaps from round to square.

```tsx
import React from 'react';
import { Progress } from 'antd';

const App: React.FC = () => (
  <>
    <Progress strokeLinecap="square" percent={75} />
    <Progress strokeLinecap="square" type="circle" percent={75} />
    <Progress strokeLinecap="square" type="dashboard" percent={75} />
  </>
);

export default App;
```
