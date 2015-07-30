# 自定义关闭按钮

- order: 3

自定义关闭按钮的样式和文字。

---

````jsx
var notification = require('antd/lib/notification');

var btn = <button className="ant-btn ant-btn-primary ant-btn-sm">自定义关闭按钮</button>;

var openNotification = function() {
  var args = {
    message: "这是标题",
    description: "这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案",
    btn: btn
  }; 
  notification.show(args);
};

React.render(
   <button className="ant-btn ant-btn-primary" onClick={openNotification}>自定义关闭按钮</button>
, document.getElementById('components-notification-demo-with-btn'));
````