# 自定义渲染

- order: 2

用 `dateCellRender` 和 `monthCellRender` 函数来自定义需要渲染的数据。

---

````jsx
import { Calendar } from 'antd';

function dateCellRender(value) {
  return <div>date</div>;
}

function monthCellRender(value) {
  return <div>month</div>;
}

ReactDOM.render(
  <Calendar value={new Date('2010-10-10')}
  dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
, document.getElementById('components-calendar-demo-custom-render'));
````
