# 不展示秒

-	order: 3

不展示秒，也不允许选择。

---

````jsx
import { TimePicker } from 'antd';

ReactDOM.render(
  <TimePicker defaultValue="12:08:23" format="HH:mm" />
, document.getElementById('components-time-picker-demo-without-seconds'));
````
