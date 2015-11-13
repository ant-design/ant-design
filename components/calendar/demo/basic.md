# 基本

- order: 0

一个通用的日历面板，支持年/月切换。

---

````jsx
import { Calendar } from 'antd';

function onChange(value) {
  console.log(value);
}

ReactDOM.render(
  <Calendar type="date" onChange={onChange} />
, document.getElementById('components-calendar-demo-basic'));
````
