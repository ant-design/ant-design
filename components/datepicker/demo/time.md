# 日期时间选择

- order: 4

和 [时间选择框](/components/timepicer) 配合使用。

---

````jsx
import { Datepicker, Timepicker } from 'antd';

let result = new Date();
let selectdDate, selectdTime;
function handleChange(from, value) {
  if (!value) {
    from === 'date' ?
      (selectdDate = false) : (selectdTime = false);
    return;
  }
  if (from === 'date') {
    result.setFullYear(value.getFullYear());
    result.setMonth(value.getMonth());
    result.setDate(value.getDate());
    selectdDate = true;
  } else {
    result.setHours(value.getHours());
    result.setMinutes(value.getMinutes());
    result.setSeconds(value.getSeconds());
    selectdTime = true;
  }
  if (selectdDate && selectdTime) {
    console.log('选择结果是：' + result);
  }
}

ReactDOM.render(<div>
  <Datepicker onChange={handleChange.bind(null, 'date')} />
  <Timepicker onChange={handleChange.bind(null, 'time')} />
</div>, document.getElementById('components-datepicker-demo-time'));
````
