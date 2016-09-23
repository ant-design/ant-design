---
order: 9
title:
  zh-CN: 月选择器
  en-US: MonthPicker
---

## zh-CN

使用 `MonthPicker` 实现月选择器。

## en-US

You can get a month selector by using `MonthPicker`.

````jsx
import { DatePicker } from 'antd';
import moment from 'moment';

const MonthPicker = DatePicker.MonthPicker;
ReactDOM.render(
  <MonthPicker defaultValue={moment('2015-12', 'YYYY-MM')} />
, mountNode);
````
