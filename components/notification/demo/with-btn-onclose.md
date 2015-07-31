# 自定义关闭按钮同时触发回调函数

- order: 4

关闭自定义的关闭按钮时触发回调函数，同时还可以在默认关闭按钮上添加另一个回调函数。

---

````jsx
var notification = require('antd/lib/notification');

var close = function() {
  // 自定义按钮关闭时的业务处理
  console.log("我被自定义的关闭按钮关闭了！");
  // 隐藏提醒框
  notification.close('singleKey1');
};

var onClose = function() {
  // 默认按钮关闭时的业务处理
  console.log("我被默认的关闭按钮关闭了！");
};

var btn = <button onClick={close} className="ant-btn ant-btn-primary ant-btn-sm">自定义关闭按钮并触发回调函数</button>;

var openNotification = function() {
  var key = 'manual' + new Date().getTime();
  var args = {
    message: "这是标题",
    description: "这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案",
    btn: btn,
    key: 'singleKey1',
    onClose: onClose
  }; 
  notification.open(args);
};

React.render(
  <button className="ant-btn ant-btn-primary" onClick={openNotification}>点击自定义的按钮触发回调函数</button>
, document.getElementById('components-notification-demo-with-btn-onclose'));
````
