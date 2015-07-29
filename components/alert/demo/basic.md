# 基本

- order: 0

最简单的用法，适用于简短的警告提示。

---

````jsx
var Alert = require('antd/lib/alert');

React.render(
  <div>
    <Alert
      description="警告提示的文案"
      type="success"
    />
  </div>,
document.getElementById('components-alert-demo-basic'));
````
