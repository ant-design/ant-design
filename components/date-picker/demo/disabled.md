---
order: 5
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

ReactDOM.render(
  <DatePicker defaultValue={moment('2015-06-06', 'YYYY-MM-DD')} disabled />
, mountNode);
````
