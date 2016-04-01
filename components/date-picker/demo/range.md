---
order: 8
title: 日期范围二
---

使用 `RangePicker` 实现日期范围选择有更好的交互体验。

````jsx
import { DatePicker } from 'antd';
const RangePicker = DatePicker.RangePicker;

function onChange(value, dateString) {
  console.log('From: ', value[0], ', to: ', value[1]);
  console.log('From: ', dateString[0], ', to: ', dateString[1]);
}
ReactDOM.render(<div>
  <RangePicker style={{ width: 184 }} onChange={onChange} />
  <br />
  <RangePicker showTime format="yyyy/MM/dd HH:mm:ss" onChange={onChange} />
</div>, mountNode);
````
