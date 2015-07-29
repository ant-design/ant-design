# 回调函数

- order: 5

警告提示被关闭时触发的回调函数，必须设置`closable="true"`。

---

````jsx
var Alert = require('antd/lib/alert');

var onClose = function(){
  console.log('我要被关闭啦！');
}

React.render(
  <div>
    <Alert
      message="警告提示的文案"
      type="warn"
      closable="true"
      onClose={onClose}
    />
    <Alert
      message="警告提示的标题"
      description="警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案"
      type="error"
      closable="true"
      onClose={onClose}
    />
  </div>,
document.getElementById('components-alert-demo-onclose'));
````
