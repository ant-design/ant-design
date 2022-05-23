---
order: 2
title:
  zh-CN: 日期格式
  en-US: Date Format
---

## zh-CN

使用 `format` 属性，可以自定义日期显示格式。

## en-US

We can set the date format by `format`.

```tsx
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import React from 'react';

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const weekFormat = 'MM/DD';
const monthFormat = 'YYYY/MM';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const customFormat: DatePickerProps['format'] = value =>
  `custom format: ${value.format(dateFormat)}`;

const customWeekStartEndFormat: DatePickerProps['format'] = value =>
  `${moment(value).startOf('week').format(weekFormat)} ~ ${moment(value)
    .endOf('week')
    .format(weekFormat)}`;

const App: React.FC = () => (
  <Space direction="vertical" size={12}>
    <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
    <DatePicker defaultValue={moment('01/01/2015', dateFormatList[0])} format={dateFormatList} />
    <DatePicker defaultValue={moment('2015/01', monthFormat)} format={monthFormat} picker="month" />
    <DatePicker defaultValue={moment()} format={customWeekStartEndFormat} picker="week" />
    <RangePicker
      defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
      format={dateFormat}
    />
    <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={customFormat} />
  </Space>
);

export default App;
```
