# 四种样式

- order: 1

共有四种样式`success`、`info`、`warn`、`error`。

---

````jsx
var Alert = require('antd/lib/alert');

React.render(
<div>
  <Alert message="这是一个通知栏" alertStyle={"success"} />
  <Alert message="这是一个通知栏" alertStyle={"info"} />
  <Alert message="这是一个通知栏" alertStyle={"warn"} />
  <Alert message="这是一个通知栏" alertStyle={"error"} />
</div>,
document.getElementById('components-alert-demo-style'));
````