# 基本

- order: 0

最简单的用法。

---

````jsx
var Popover = antd.Popover;
var content = [
  <p>内容</p>,
  <p>内容</p>,
  <p>内容</p>
];

React.render(
  <Popover overlay={content} title="标题">
    <button className="ant-btn ant-btn-primary">弹出卡片</button>
  </Popover>
, document.getElementById('components-popover-demo-basic'));
````
