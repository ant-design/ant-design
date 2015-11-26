# 跳转

- order: 3

快速跳转到某一页。

---

````jsx
import { Pagination } from 'antd';

function onChange(page) {
  console.log(page);
}

ReactDOM.render(
  <Pagination showQuickJumper current={2} onChange={onChange} total={500} />,
 document.getElementById('components-pagination-demo-jump'));
````
