# 自定义关闭按钮同时触发回调函数

- order: 4

关闭自定义的关闭按钮时触发回调函数，同时还可以在默认关闭按钮上添加另一个回调函数。

---

````jsx
var Notification = require('antd/lib/notification');

if(!Notification.notification){
  Notification.notification = Notification.newInstance({
    prefixCls: 'ant-notification',
    style: {
      top: 0,
      right: 0
    }
  });
}

var customClose = function() {
  console.log("我被自定义的关闭按钮关闭了！");
}

var close = function() {
  console.log("我被默认的关闭按钮关闭了！");
}

var btn = <button className="ant-btn ant-btn-primary ant-btn-sm">自定义关闭按钮并触发回调函数</button>;

var openNotification = function() {
  var args = {
    message: "这是标题",
    description: "这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案",
    btn: btn,
    customClose: customClose,
    defaultClose: close
  }; 
  Notification.show(args);
}

React.render(
  <div>
    <button className="ant-btn ant-btn-primary" onClick={openNotification}>关闭自定义的按钮触发回调函数</button>
  </div>,
document.getElementById('components-notification-demo-with-btn-onclose'));
````