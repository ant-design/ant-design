# 时间选择

- order: 4

和 [时间选择组件](/components/timepicker) 配合使用。

---

````jsx
import { Datepicker, Timepicker } from 'antd';

function onDateChange(date) {
  console.log(date.toLocaleDateString());
}

function onTimeChange(time) {
  console.log(time.toLocaleTimeString());
  console.log('时', time.getHours());
  console.log('分', time.getMinutes());
  console.log('秒', time.getSeconds());
}

ReactDOM.render(<div>
  <Datepicker onChange={onDateChange} />
  <Timepicker onChange={onTimeChange} />
</div>, document.getElementById('components-datepicker-demo-time'));
````
