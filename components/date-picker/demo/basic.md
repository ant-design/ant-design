# 基本

- order: 0

最简单的用法。

---

````jsx
import { DatePicker } from 'antd';

function onChange(value) {
  console.log(value);
}

ReactDOM.render(
  <DatePicker onChange={onChange} />
, document.getElementById('components-date-picker-demo-basic'));
````
