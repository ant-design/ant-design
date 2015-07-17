# 基本

- order: 0

最简单的用法。

---

````jsx
var Popconfirm = antd.Popconfirm;
var message = antd.message;

function confirm() {
  message.success('点击了确定');
}

function cancel() {
  message.error('点击了取消');
}

React.render(
  <Popconfirm title="确定要删除这个任务吗？" onConfirm={confirm} onCancel={cancel}>
    <a href="javascript:;">删除</a>
  </Popconfirm>
, document.getElementById('components-popconfirm-demo-basic'));
````

