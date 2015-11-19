# 三种大小

-	order: 6

三种大小的输入框，大的用在表单中，中的为默认。

---

````jsx
import { Timepicker } from 'antd';

ReactDOM.render(
  <div>
    <Timepicker defaultValue="12:08:23" size="large" />
    <Timepicker defaultValue="12:08:23" />
    <Timepicker defaultValue="12:08:23" size="small" />
  </div>
, document.getElementById('components-timepicker-demo-size'));
````
