---
order: 10
title:
  zh-CN: 边缘形状
  en-US: Stroke Linecap
---

## zh-CN

通过设定 `strokeLinecap="butt"` 可以调整进度条边缘的形状为方形，详见 [stroke-linecap](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap)。

## en-US

By setting `strokeLinecap="butt"`, you can change the linecaps from `round` to `butt`, see [stroke-linecap](https://developer.mozilla.org/docs/Web/SVG/Attribute/stroke-linecap) for more information.

```tsx
import { Progress } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <>
    <Progress strokeLinecap="butt" percent={75} />
    <Progress strokeLinecap="butt" type="circle" percent={75} />
    <Progress strokeLinecap="butt" type="dashboard" percent={75} />
  </>
);

export default App;
```
