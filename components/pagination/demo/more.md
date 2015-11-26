# 更多

- order: 1

更多分页。

---

````jsx
import { Pagination } from 'antd';

function onChange(page) {
  console.log(page);
}

ReactDOM.render(
  <Pagination current={1} onChange={onChange} total={500} />,
 document.getElementById('components-pagination-demo-more'));
````
