# 基本

- order: 0

最简单的用法。

---

````jsx
var Alert = require('antd/lib/alert');

React.render(
<div>
  <Alert message="这是一个警告框" alertStyle={"success"} />
</div>,
document.getElementById('components-alert-demo-basic'));
````