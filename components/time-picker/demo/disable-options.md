# 禁止选项

-	order: 5

禁止部分选项。

---

````jsx
import { TimePicker } from 'antd';

function disabledHours() {
  return [0, 4, 8, 12, 16, 20];
}

function disabledMinutes(h) {
  return [h % 60];
}

function disabledSeconds(h, m) {
  return [h + m % 60];
}

ReactDOM.render(
  <TimePicker defaultValue="12:08:23" disabledHours={disabledHours} disabledMinutes={disabledMinutes} disabledSeconds={disabledSeconds} />
, document.getElementById('components-time-picker-demo-disable-options'));
````
