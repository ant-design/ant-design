# 卡片模式

- order: 10

用于嵌套在空间有限的容器中。

---

````jsx
import { Calendar } from 'antd';

function onPanelChange(value, mode) {
  console.log(value, mode);
}

ReactDOM.render(
  <div style={{ width: 290, border: '1px solid #d9d9d9', borderRadius: 4 }}>
    <Calendar fullscreen={false} onPanelChange={onPanelChange} />
  </div>
, document.getElementById('components-calendar-demo-card'));
````
