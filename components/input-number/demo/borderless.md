---
order: 6
title:
  zh-CN: 无边框
  en-US: Borderless
---

## zh-CN

没有边框。

## en-US

No border.

```tsx
import React from 'react';
import { InputNumber } from 'antd';

const App: React.FC = () => <InputNumber min={1} max={10} defaultValue={3} bordered={false} />;

export default App;
```
