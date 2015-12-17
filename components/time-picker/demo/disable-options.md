# 禁止选项

- order: 5

限制选择 `20:30` 到 `23:30` 这个时间段。

---

````jsx
import { TimePicker } from 'antd';

function newArray(start, end) {
  let result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledHours() {
  let hours = newArray(0, 60);
  hours.splice(20, 4);
  return hours;
}

function disabledMinutes(h) {
  if (h === 20) {
    return newArray(0, 31);
  } else if (h === 23) {
    return newArray(30, 60);
  } else {
    return [];
  }
}

ReactDOM.render(
  <TimePicker disabledHours={disabledHours} disabledMinutes={disabledMinutes} />
, document.getElementById('components-time-picker-demo-disable-options'));
````
