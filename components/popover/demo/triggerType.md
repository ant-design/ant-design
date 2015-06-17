# 三种触发方式

- order: 2

鼠标移入、聚集、点击。

---

````jsx
var Popover = antd.Popover;
var content = [
  <p>内容</p>,
  <p>内容</p>,
  <p>内容</p>
];

React.render(<div>
  <Popover overlay={content} title="标题" trigger="hover">
    <button className="ant-btn">移入</button>
  </Popover>
  <Popover overlay={content} title="标题" trigger="focus">
    <a href="javascript:;" className="ant-btn">聚焦</a>
  </Popover>
  <Popover overlay={content} title="标题" trigger="click">
    <button className="ant-btn">点击</button>
  </Popover>
</div>, document.getElementById('components-popover-demo-triggertype'));
````
