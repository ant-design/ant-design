---
order: 14
title:
  zh-CN: 无边框
  en-US: Bordered-less
---

## zh-CN

无边框样式。

## en-US

Bordered-less style component.

```tsx
import { TimePicker } from 'antd';
import React from 'react';

const { RangePicker } = TimePicker;

const App: React.FC = () => (
  <>
    <TimePicker bordered={false} />
    <RangePicker bordered={false} />
  </>
);

export default App;
```
