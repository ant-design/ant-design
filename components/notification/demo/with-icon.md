# 带有Icon的通知提醒框

- order: 2

通知提醒框左侧有Icon图标。

---

````jsx
var notification = require('antd/lib/notification');

var openNotificationSuccess = function() {
  var args = {
    message: "这是标题",
    description: "这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案",
    icon: "success"
  }; 
  notification.open(args);
};

var openNotificationInfo = function() {
  var args = {
    message: "这是标题",
    description: "这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案",
    icon: "info"
  }; 
  notification.open(args);
};

var openNotificationWarn = function() {
  var args = {
    message: "这是标题",
    description: "这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案",
    icon: "warn"
  }; 
  notification.open(args);
};

var openNotificationError = function() {
  var args = {
    message: "这是标题",
    description: "这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案",
    icon: "error"
  }; 
  notification.open(args);
};

React.render(<div>
  <button className="ant-btn ant-btn-primary" onClick={openNotificationSuccess}>Success</button>
  <button className="ant-btn ant-btn-primary" onClick={openNotificationInfo}>Info</button>
  <button className="ant-btn ant-btn-primary" onClick={openNotificationWarn}>Warn</button>
  <button className="ant-btn ant-btn-primary" onClick={openNotificationError}>Error</button>
  </div>
, document.getElementById('components-notification-demo-with-icon'));
````