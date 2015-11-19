# 基本

-	order: 0

最简单的用法。

---

````jsx
import { Timepicker } from 'antd';

function onChange(time) {
  console.log(time.toLocaleTimeString('zh-CN', {
    hour12: false
  }));
}

ReactDOM.render(
  <Timepicker defaultValue="12:08:23" onChange={onChange} />
, document.getElementById('components-timepicker-demo-basic'));
````
