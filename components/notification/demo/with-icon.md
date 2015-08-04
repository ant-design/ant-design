# 带有Icon的通知提醒框

- order: 2

通知提醒框左侧有Icon图标。

---

````jsx
var notification = require('antd/lib/notification');

var openNotificationSuccess = function() {
  var args = {
    message: "这是成功通知提醒框的标题",
    description: "这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案",
    icon: "success"
  }; 
  notification.open(args);
};

var openNotificationInfo = function() {
  var args = {
    message: "这是消息通知提醒框的标题",
    description: "这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案",
    icon: "info"
  }; 
  notification.open(args);
};

var openNotificationWarn = function() {
  var args = {
    message: "这是警告通知提醒框的标题",
    description: "这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案",
    icon: "warn"
  }; 
  notification.open(args);
};

var openNotificationError = function() {
  var args = {
    message: "这是错误通知提醒框的标题",
    description: "这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案",
    icon: "error"
  }; 
  notification.open(args);
};

React.render(<div>
  <button className="ant-btn" onClick={openNotificationSuccess}>成功</button>
  <button className="ant-btn" onClick={openNotificationInfo}>消息</button>
  <button className="ant-btn" onClick={openNotificationWarn}>警告</button>
  <button className="ant-btn" onClick={openNotificationError}>错误</button>
  </div>
, document.getElementById('components-notification-demo-with-icon'));
````

<style>
.code-box-demo .ant-btn {
  margin-right: 1em;
}
</style>
