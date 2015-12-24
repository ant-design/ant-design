# 日期范围二

- order: 8

使用 `RangePicker` 实现日期范围选择有更好的交互体验。

---

````jsx
import { DatePicker } from 'antd';
const RangePicker = DatePicker.RangePicker;

function onChange(value) {
  console.log('From: ', value[0], ', to: ', value[1]);
}
ReactDOM.render(<div>
  <RangePicker style={{width: 184}} onChange={onChange} />
  <br />
  <RangePicker showTime format="yyyy-MM-dd HH:mm:ss" onChange={onChange} />
</div>, document.getElementById('components-date-picker-demo-range'));
````
