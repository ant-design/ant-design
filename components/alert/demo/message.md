# 含有标题

- order: 2

警告提示的标题文案，当含有标题时，关闭样式只能为默认值。

---

````jsx
var Alert = require('antd/lib/alert');

React.render(
  <div>
    <Alert 
      message="警告提示的标题"
      description="警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案"
      type="success"
    />
    <Alert 
      message="警告提示的标题"
      description="警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案"
      type="info"
    />
    <Alert 
      message="警告提示的标题"
      description="警告提示的文案警告提示的文案警告提示的文案"
      type="warn"
    />
    <Alert 
      message="警告提示的标题"
      description="警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案"
      type="error"
    />
  </div>,
document.getElementById('components-alert-demo-message'));
````
