# 自定义关闭的文字

- order: 3

可以自定义关闭的文字，自定义的文字会替换原先的关闭 `Icon`，当警告提示含有标题时，关闭样式只能为默认值。

---

````jsx
var Alert = require('antd/lib/alert');

React.render(
  <div>
    <Alert
      description="警告提示的文案"
      type="info"
      closeText="自定义关闭文字"
    />
  </div>,
document.getElementById('components-alert-demo-close-type'));
````
