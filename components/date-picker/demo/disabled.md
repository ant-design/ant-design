---
order: 4
title:
  zh-CN: 禁用
  en-US: Disabled
---

## zh-CN

选择框的不可用状态。

## en-US

A disabled state of the `DatePicker`.

````jsx
import { DatePicker } from 'antd';
import moment from 'moment';

const { MonthPicker, RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';
ReactDOM.render(
  <div>
    <DatePicker defaultValue={moment('2015-06-06', dateFormat)} disabled />
    <br />
    <MonthPicker defaultValue={moment('2015-06', 'YYYY-MM')} disabled />
    <br />
    <RangePicker
      defaultValue={[moment('2015-06-06', dateFormat), moment('2015-06-06', dateFormat)]}
      disabled
    />
  </div>,
  mountNode
);
````
