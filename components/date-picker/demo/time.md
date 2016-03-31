---
order: 4
title: 日期时间选择
---

增加选择时间功能。不要修改时间的格式 `HH:mm:ss`。



````jsx
import { DatePicker } from 'antd';

function onChange(value) {
  console.log('选择了时间：', value);
}

ReactDOM.render(
<DatePicker showTime format="yyyy-MM-dd HH:mm:ss" placeholder="请选择时间" onChange={onChange} />
, mountNode);
````
