# 迷你的改变

- order: 5

改变每页显示条目数

---

````jsx
var Pagination = antd.Pagination;

function onChange(page) {
  console.log(page);
}

React.render(
  <Pagination className="mini" showQuickJumper={true} showSizeChanger={true} onChange={onChange} total={500} />, 
 document.getElementById('components-pagination-demo-mini-more'));
````
