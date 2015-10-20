# 迷你

- order: 4

迷你版本。

---

````jsx
var Pagination = antd.Pagination;

function onChange(page) {
  console.log(page);
}

ReactDOM.render(
  <Pagination className="mini" onChange={onChange} total={50} />,
 document.getElementById('components-pagination-demo-mini'));
````
