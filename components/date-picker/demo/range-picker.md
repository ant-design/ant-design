---
order: 1
title:
  zh-CN: 范围选择器
  en-US: Range Picker
---

## zh-CN

通过设置 `picker` 属性，指定范围选择器类型。

## en-US

Set range picker type by `picker` prop.

```tsx
import { DatePicker, Space } from 'antd';
import React from 'react';

const { RangePicker } = DatePicker;

const App: React.FC = () => (
  <Space direction="vertical" size={12}>
    <RangePicker />
    <RangePicker showTime />
    <RangePicker picker="week" />
    <RangePicker picker="month" />
    <RangePicker picker="quarter" />
    <RangePicker picker="year" />
  </Space>
);

export default App;
```
