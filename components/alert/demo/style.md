# 四种样式

- order: 1

共有四种样式`success`、`info`、`warn`、`error`。

---

````jsx
var Alert = require('antd/lib/alert');

React.render(
  <div>
    <Alert
      description="警告提示的文案"
      type="success"
    />
    <Alert
      description="警告提示的文案警告提示的文案"
      type="info"
    />
    <Alert
      description="警告提示的文案"
      type="warn"
    />
    <Alert
      description="警告提示的文案警告提示的文案"
      type="error"
    />
  </div>,
document.getElementById('components-alert-demo-style'));
````
