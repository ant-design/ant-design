# 四种样式

- order: 1

共有四种样式`success`、`info`、`warn`、`error`。

---

````jsx
var Alert = require('antd/lib/alert');

React.render(
<div>
  <Alert message="这是一个通知栏" alertType={"success"} />
  <Alert message="这是一个通知栏" alertType={"info"} />
  <Alert message="这是一个通知栏" alertType={"warn"} />
  <Alert message="这是一个通知栏" alertType={"error"} />
</div>,
document.getElementById('components-alert-demo-style'));
````