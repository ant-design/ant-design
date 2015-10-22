# 三种触发方式

- order: 2

鼠标移入、聚集、点击。

---

````jsx
var Popover = antd.Popover;
var Button = antd.Button;

var content = <div>
  <p>内容</p>
  <p>内容</p>
</div>;

ReactDOM.render(<div>
  <Popover overlay={content} title="标题" trigger="hover">
    <Button>移入</Button>
  </Popover>
  <Popover overlay={content} title="标题" trigger="focus">
    <Button>聚焦</Button>
  </Popover>
  <Popover overlay={content} title="标题" trigger="click">
    <Button>点击</Button>
  </Popover>
</div>, document.getElementById('components-popover-demo-triggertype'));
````
