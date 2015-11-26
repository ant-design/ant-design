# 改变

- order: 2

改变每页显示条目数。

---

````jsx
import { Pagination } from 'antd';

function onShowSizeChange(current, pageSize) {
  console.log(current, pageSize);
}

ReactDOM.render(
  <Pagination showSizeChanger onShowSizeChange={onShowSizeChange} defaultCurrent={3} total={500} />,
 document.getElementById('components-pagination-demo-changer'));
````
