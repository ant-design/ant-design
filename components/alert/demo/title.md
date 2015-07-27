# 含有标题

- order: 2

警告提示的标题文案，当含有标题时，关闭样式只能为默认值。

---

````jsx

var Alert = require('antd/lib/alert');

React.render(
<div>
  <Alert
  title={'警告提示的标题'}
  message="警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案"
  alertType={"success"}
  />
  <Alert
  title={'警告提示的标题'}
  message="警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案"
  alertType={"info"}
  />
  <Alert
  title={'警告提示的标题'}
  message="警告提示的文案警告提示的文案警告提示的文案"
  alertType={"warn"}
  />
  <Alert
  title={'警告提示的标题'}
  message="警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案"
  alertType={"error"}
  />
</div>,
document.getElementById('components-alert-demo-title'));

````
