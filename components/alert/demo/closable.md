# 可关闭的警告提示

- order: 1

显示关闭按钮，点击可关闭警告提示。

---

````jsx
var Alert = require('antd/lib/alert');

var onClose = function(e) {
  console.log(e, '我要被关闭啦！');
};

React.render(
  <div>
    <Alert message="成功提示的文案"
      type="success"
      closable
      onClose={onClose}
    />
    <Alert message="错误提示的文案"
      description="错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍错误提示的辅助性文字介绍"
      type="error"
      closable
      onClose={onClose}
    />
  </div>
, document.getElementById('components-alert-demo-closable'));
````
