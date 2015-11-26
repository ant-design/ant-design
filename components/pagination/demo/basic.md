# 基本

- order: 0

基础分页。

---

````jsx
import { Pagination } from 'antd';

function onChange(page) {
  console.log(page);
}

ReactDOM.render(
  <Pagination current={1} onChange={onChange} total={50} />,
 document.getElementById('components-pagination-demo-basic'));
````
