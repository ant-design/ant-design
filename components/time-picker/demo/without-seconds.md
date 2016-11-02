---
order: 3
title: 
  zh-CN: 不展示秒
  en-US: Hide the seconds options
---

## zh-CN

不展示秒，也不允许选择。

## en-US

The `seconds` options are hidden and cannot be selected.

````jsx
import { TimePicker } from 'antd';
import moment from 'moment';

const format = 'HH:mm';
ReactDOM.render(
  <TimePicker defaultValue={moment('12:08', format)} format={format} />
, mountNode);
````
