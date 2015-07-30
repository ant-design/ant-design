# 带有Icon的通知提醒框

- order: 1

通知提醒框左侧有Icon图标。

---

````jsx
var notification = require('antd/lib/notification');

var openNotification = function() {
  var args = {
    message: "这是标题",
    description: "这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案",
    icon: true
  }; 
  notification.show(args);
};

React.render(
  <button className="ant-btn ant-btn-primary" onClick={openNotification}>带有Icon的通知提醒框</button>
, document.getElementById('components-notification-demo-with-icon'));
````