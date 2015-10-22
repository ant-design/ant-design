# 基本

- order: 0

简单的徽章展示。

---

````jsx
var Badge = antd.Badge;

ReactDOM.render(
  <Badge count="5">
    <a href="#" className="head-example"></a>
  </Badge>
, document.getElementById('components-badge-demo-basic'));
````

````css
.ant-badge {
  margin-right: 16px;
}
.head-example {
  width: 42px;
  height: 42px;
  border-radius: 6px;
  background: #eee;
  display: inline-block;
}
````
