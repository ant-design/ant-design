特定选项
====

-	order: 3

分钟只提供特定的选择，同时可以通过 `hourOptions` 和 `secondOptions` 对小时和秒进行特殊的限定。

---

````jsx
import { TimePicker } from 'antd';

ReactDOM.render(
  <TimePicker defaultValue="12:30:23" format="HH:mm" minuteOptions={[0, 30]} />
, document.getElementById('components-timepicker-demo-special-minutes'));
````
