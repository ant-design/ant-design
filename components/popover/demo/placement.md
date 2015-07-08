# 位置

- order: 1

位置有四个方向。

---

````jsx
var Popover = antd.Popover;
var text = <span>标题</span>;
var content = <div>
  <p>内容</p>
  <p>内容</p>
</div>;

React.render(<div>
  <Popover placement="left" title={text} overlay={content}>
    <button className="ant-btn">左</button>
  </Popover>
  <Popover placement="right" title={text} overlay={content}>
    <button className="ant-btn">右</button>
  </Popover>
  <Popover placement="top" title={text} overlay={content}>
    <button className="ant-btn">上</button>
  </Popover>
  <Popover placement="bottom" title={text} overlay={content}>
    <button className="ant-btn">下</button>
  </Popover>
</div>, document.getElementById('components-popover-demo-placement'));
````

<style>
.code-box-demo .ant-btn {
  margin-right: 1em;
}
</style>
