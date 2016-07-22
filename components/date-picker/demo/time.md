---
order: 4
title:
  zh-CN: 日期时间选择
  en-US: To choose time
---

## zh-CN

增加选择时间功能，当 `showTime` 为一个对象时，其属性会传递给内建的 `TimePicker`。

## en-US

This property provide an additional time selection. When `showTime` is an Object, its properties will be passed on to `TimePicker`, witch is a built-in function.

````jsx
import { DatePicker } from 'antd';

function onChange(value) {
  console.log('选择了时间：', value);
}

ReactDOM.render(
  <DatePicker showTime format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间" onChange={onChange} />
, mountNode);
````
