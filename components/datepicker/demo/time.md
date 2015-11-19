# 时间选择

- order: 4

和 [时间选择组件](/components/timepicker) 配合使用。

---

````jsx
import { Datepicker, Timepicker } from 'antd';

function onDateChange(date) {
  console.log(date);
}

function onTimeChange(time) {
  console.log(time);
}

ReactDOM.render(<div>
  <Datepicker onChange={onDateChange} />
  <Timepicker onChange={onTimeChange} />
</div>, document.getElementById('components-datepicker-demo-time'));
````
