# 迷你

- order: 4

迷你版本。

---

````jsx
import { Pagination } from 'antd';

function onChange(page) {
  console.log(page);
}

ReactDOM.render(
  <Pagination size="small" current={1} onChange={onChange} total={50} />,
 document.getElementById('components-pagination-demo-mini'));
````
