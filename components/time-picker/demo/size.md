# 三种大小

-	order: 2

三种大小的输入框，大的用在表单中，中的为默认。

---

````jsx
import { TimePicker } from 'antd';

ReactDOM.render(
  <div>
    <TimePicker defaultValue="12:08:23" size="large" />
    <TimePicker defaultValue="12:08:23" />
    <TimePicker defaultValue="12:08:23" size="small" />
  </div>
, document.getElementById('components-time-picker-demo-size'));
````
