# 简洁

- order: 6

简单地翻页。

---

````jsx
import { Pagination } from 'antd';

function onChange(page) {
  console.log(page);
}

ReactDOM.render(
  <Pagination simple onChange={onChange} total={50} />,
document.getElementById('components-pagination-demo-simple'));
````
