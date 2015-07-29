# 可关闭的警告提示

- order: 1

显示关闭按钮，点击可关闭警告提示。

---

````jsx
var Alert = require('antd/lib/alert');

var onClose = function(e) {
  console.log(e, '我要被关闭啦！');
};

React.render(<div>
  <Alert message="警告提示的文案"
    type="warn"
    closable
    onClose={onClose} />
  <Alert message="警告提示的标题"
    description="警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案"
    type="error"
    closable
    onClose={onClose} />
</div>, document.getElementById('components-alert-demo-closable'));
````

