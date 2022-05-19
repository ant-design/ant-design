---
order: 99
debug: true
title:
  zh-CN: 后缀图标
  en-US: Suffix
---

## zh-CN

最简单的用法，在浮层中可以选择或者输入日期。

## en-US

Basic use case. Users can select or input a date in panel.

```tsx
import React from 'react';
import { DatePicker, Space } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import type { Moment } from 'moment';

const smileIcon = <SmileOutlined />;
const { RangePicker } = DatePicker;

type DatePickerValue = Moment | null;
type RangePickerValue = [Moment | null, Moment | null] | null;

const onChange = (
  date: DatePickerValue | RangePickerValue,
  dateString: [string, string] | string,
) => {
  console.log(date, dateString);
};

const App: React.FC = () => (
  <Space direction="vertical" size={12}>
    <DatePicker suffixIcon={smileIcon} onChange={onChange} />
    <DatePicker suffixIcon={smileIcon} onChange={onChange} picker="month" />
    <RangePicker suffixIcon={smileIcon} onChange={onChange} />
    <DatePicker suffixIcon={smileIcon} onChange={onChange} picker="week" />
    <DatePicker suffixIcon="ab" onChange={onChange} />
    <DatePicker suffixIcon="ab" onChange={onChange} picker="month" />
    <RangePicker suffixIcon="ab" onChange={onChange} />
    <DatePicker suffixIcon="ab" onChange={onChange} picker="week" />
  </Space>
);

export default App;
```
