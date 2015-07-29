# 自定义关闭

- order: 3

可以自定义关闭，自定义的文字会替换原先的关闭 `Icon`，当警告提示含有标题时，关闭样式只能为默认值。

---

````jsx
var Alert = require('antd/lib/alert');
var link = <a href="javascript:;">不再提醒</a>

React.render(
  <div>
    <Alert
      description="警告提示的文案"
      type="info"
      closeText={link}
    />
  </div>,
document.getElementById('components-alert-demo-close-type'));
````
