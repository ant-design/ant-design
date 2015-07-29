# 可关闭的警告提示

- order: 1

显示关闭按钮，点击可关闭警告提示。

---

````jsx
var Alert = require('antd/lib/alert');

React.render(
  <div>
    <Alert
      message="警告提示的文案"
      type="success"
      closable="true"
    />
  </div>,
document.getElementById('components-alert-demo-closable'));
````
