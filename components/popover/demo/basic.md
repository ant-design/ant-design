# 基本

- order: 0

最简单的用法。

---

````jsx
var Popover = antd.Popover;
var Button = antd.Button;

var content = <div>
  <p>内容</p>
  <p>内容</p>
</div>;

ReactDOM.render(
  <Popover overlay={content} title="标题">
    <Button type="primary">弹出卡片</Button>
  </Popover>
, document.getElementById('components-popover-demo-basic'));
````
