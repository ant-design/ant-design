# 关闭的样式

- order: 3

关闭有`不再提醒`和Iconfont的`cross`两种样式，默认为后者，当警告提示含有标题时，关闭样式只能为默认值。

---

````jsx
var Alert = require('antd/lib/alert');

React.render(
<div>
  <Alert
  message="警告提示的文案"
  alertType={"success"}
  />
  <Alert
  message="警告提示的文案"
  alertType={"info"}
  alertClose={'text'}
  />
</div>,
document.getElementById('components-alert-demo-close-type'));
````