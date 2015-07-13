# 跳转

- order: 3

快速跳转到某一页

---

````jsx
var Pagination = antd.Pagination;

function onChange(page) {
  console.log(page);
}

React.render(
  <Pagination showQuickJumper={true} onChange={onChange} total={500} />, 
 document.getElementById('components-pagination-demo-jump'));
````
