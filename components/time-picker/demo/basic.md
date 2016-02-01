# 基本

-	order: 0

最简单的用法。

---

````jsx
import { TimePicker } from 'antd';

function onChange(time) {
  console.log(time);
}

ReactDOM.render(
  <TimePicker onChange={onChange} />
, mountNode);
````
