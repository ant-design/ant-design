# 可点击

- order: 2

用 a 标签进行包裹即可。

---

````jsx
var Badge = antd.Badge;

ReactDOM.render(
  <a href="#">
    <Badge count="5">
      <span className="head-example"></span>
    </Badge>
  </a>
, document.getElementById('components-badge-demo-link'));
````
