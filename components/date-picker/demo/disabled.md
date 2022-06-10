---
order: 4
title:
  zh-CN: 禁用
  en-US: Disabled
---

## zh-CN

选择框的不可用状态。你也可以通过数组单独禁用 RangePicker 的其中一项。

## en-US

A disabled state of the `DatePicker`. You can also set as array to disable one of input.

```tsx
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import React from 'react';

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';

const App: React.FC = () => (
  <Space direction="vertical" size={12}>
    <DatePicker defaultValue={moment('2015-06-06', dateFormat)} disabled />
    <DatePicker picker="month" defaultValue={moment('2015-06', 'YYYY-MM')} disabled />
    <RangePicker
      defaultValue={[moment('2015-06-06', dateFormat), moment('2015-06-06', dateFormat)]}
      disabled
    />
    <RangePicker
      defaultValue={[moment('2019-09-03', dateFormat), moment('2019-11-22', dateFormat)]}
      disabled={[false, true]}
    />
  </Space>
);

export default App;
```
