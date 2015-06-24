# 基本

- order: 0

最简单的用法。

---

````jsx
var Popconfirm = antd.Popconfirm;

function confirm() {
  console.log('点击了确定');
}

React.render(
  <Popconfirm title="确定要删除这个任务吗？" onConfirm={confirm}>
    <button className="ant-btn ant-btn-primary">删 除</button>
  </Popconfirm>
, document.getElementById('components-popconfirm-demo-basic'));
````

