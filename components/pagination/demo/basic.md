# 基本

- order: 0

基础分页。

---

````jsx
var Pagination = antd.Pagination;

function onChange(page) {
  console.log(page);
}

React.render(
  <Pagination onChange={onChange} total={50} />,
 document.getElementById('components-pagination-demo-basic'));
````
