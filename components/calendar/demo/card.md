# 卡片模式

- order: 10

用于嵌套在空间有限的容器中。

---

````jsx
import { Calendar } from 'antd';

function onChange(value) {
  console.log(value);
}

ReactDOM.render(
  <div style={{ width: 290, border: '1px solid #d9d9d9', borderRadius: 4 }}>
    <Calendar fullscreen={false} type="date" onChange={onChange} />
  </div>
, document.getElementById('components-calendar-demo-card'));
````

