# 四种样式

- order: 1

共有四种样式`success`、`info`、`warn`、`error`。

---

````jsx
var Alert = require('antd/lib/alert');

React.render(
<div>
  <Alert message="这是一个警告框" alertStyle={"success"} />
  <Alert message="这是一个警告框" alertStyle={"info"} />
  <Alert message="这是一个警告框" alertStyle={"warn"} />
  <Alert message="这是一个警告框" alertStyle={"error"} />
</div>,
document.getElementById('components-alert-demo-style'));
````