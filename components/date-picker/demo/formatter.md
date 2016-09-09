---
order: 1
title:
  zh-CN: 日期格式
  en-US: Date format
---

## zh-CN

使用 `format` 属性，可以自定义你需要的日期显示格式，如 `YYYY/MM/DD`。

## en-US

By using `format`, you can customize the format(such as `YYYY/MM/DD`) the date is displayed in.

````jsx
import { DatePicker } from 'antd';
import moment from 'moment';

const format = 'YYYY/MM/DD';
ReactDOM.render(
  <DatePicker defaultValue={moment('2015/01/01', format)} format={format} />
, mountNode);
````
