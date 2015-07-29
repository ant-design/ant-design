# 回调函数

- order: 4

警告提示被关闭时触发的回调函数。

---

````jsx
var Alert = require('antd/lib/alert');

var callback = function(){
  console.log('我要被关闭啦！');
}

React.render(
  <div>
    <Alert
      description="警告提示的文案"
      type="warn"
      callback={callback}
    />
    <Alert
      message="警告提示的标题"
      description="警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案警告提示的文案"
      type="error"
      callback={callback}
    />
  </div>,
document.getElementById('components-alert-demo-callback'));
````
