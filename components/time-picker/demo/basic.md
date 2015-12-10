# 基本

-	order: 0

最简单的用法。

---

````jsx
import { TimePicker } from 'antd';

function onChange(time) {
  if (time) {
    console.log(time.toLocaleTimeString('zh-CN', { hour12: false }));
  }
}

ReactDOM.render(
  <TimePicker onChange={onChange} />
, document.getElementById('components-time-picker-demo-basic'));
````
