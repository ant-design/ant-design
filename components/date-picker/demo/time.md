---
order: 4
title: 日期时间选择
---

增加选择时间功能，当 `showTime` 为一个对象时，其属性会传递给内建的 `TimePicker`。

````jsx
import { DatePicker } from 'antd';

function onChange(value) {
  console.log('选择了时间：', value);
}

ReactDOM.render(
  <DatePicker showTime format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间" onChange={onChange} />
, mountNode);
````
