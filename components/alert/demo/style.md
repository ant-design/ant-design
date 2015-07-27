# 四种样式

- order: 1

共有四种样式`success`、`info`、`warn`、`error`。

---

````jsx

var Alert = require('antd/lib/alert');

React.render(
<div>
  <Alert
  message={"警告提示的文案"}
  alertType={"success"}
  />
  <Alert
  message={"警告提示的文案警告提示的文案"}
  alertType={"info"}
  />
  <Alert
  message={"警告提示的文案"}
  alertType={"warn"}
  />
  <Alert
  message={"警告提示的文案警告提示的文案"}
  alertType={"error"}
  />
</div>,
document.getElementById('components-alert-demo-style'));

````
