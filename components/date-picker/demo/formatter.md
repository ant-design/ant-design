---
order: 1
title:
  zh-CN: 日期格式
  en-US: Date format
---

## zh-CN

使用 `format` 属性，可以自定义你需要的日期显示格式，如 `yyyy/MM/dd`。

## en-US

By using `format`, you can customize the format(such as `yyyy/MM/dd`) the date is displayed in. 

````jsx
import { DatePicker } from 'antd';

ReactDOM.render(
  <DatePicker defaultValue="2015/01/01" format="yyyy/MM/dd" />
, mountNode);
````
