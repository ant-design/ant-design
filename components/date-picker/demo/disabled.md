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

```jsx
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';
ReactDOM.render(
  <>
    <DatePicker defaultValue={moment('2015-06-06', dateFormat)} disabled />
    <br />
    <DatePicker picker="month" defaultValue={moment('2015-06', 'YYYY-MM')} disabled />
    <br />
    <RangePicker
      defaultValue={[moment('2015-06-06', dateFormat), moment('2015-06-06', dateFormat)]}
      disabled
    />
    <br />
    <RangePicker
      defaultValue={[moment('2019-09-03', dateFormat), moment('2019-11-22', dateFormat)]}
      disabled={[false, true]}
    />
  </>,
  mountNode,
);
```
