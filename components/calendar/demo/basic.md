# 基本

- order: 0

一个通用的日历面板，支持年/月切换。

---

````jsx
import { Calendar } from 'antd';

function onPanelChange(value, mode) {
  console.log(value, mode);
}

ReactDOM.render(
  <Calendar onPanelChange={onPanelChange} />
, document.getElementById('components-calendar-demo-basic'));
````
