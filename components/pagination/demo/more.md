# 更多

- order: 1

更多分页

---

````jsx
var Pagination = antd.Pagination;

function onChange(page) {
  console.log(page);
}

React.render(
  <Pagination onChange={onChange} total={500} />, 
 document.getElementById('components-pagination-demo-more'));
````
