# 时间范围选择

- order: 7

使用 RangePicker 实现范围选择器。

---

````jsx
import { DatePicker } from 'antd';
const RangePicker = DatePicker.RangePicker;

function log(value) {
  console.log('From: ', value[0], ', to: ', value[1]);
}
ReactDOM.render(<RangePicker defaultValue={['2011-11-11 11:11:11', '']} onChange={log} />
, document.getElementById('components-date-picker-demo-time-range'));
````
