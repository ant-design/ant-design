# 基本

-	order: 0

最简单的用法。

---

````jsx
import { TimePicker } from 'antd';

function onChange(time) {
  console.log(time);
  if (time) {
    console.log(time.toLocaleTimeString('zh-CN', { hour12: false })); // Get time string
  }
}

ReactDOM.render(
  <TimePicker onChange={onChange} />
, mountNode);
````
