# 回调函数

- order: 4

警告提示被关闭时触发的毁掉函数。

---

````jsx
var Alert = require('antd/lib/alert');

var callback = function(){
  alert('我要被关闭啦！');
}

React.render(
<div>
  <Alert
  message="警告提示的文案"
  alertType={"warn"}
  callback={callback}
  />
  <Alert
  title={'警告提示的标题'}
  message="警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案"
  alertType={"error"}
  callback={callback}
  />
</div>,
document.getElementById('components-alert-demo-callback'));
````