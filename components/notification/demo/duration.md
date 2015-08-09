# 不自动消失

- order: 6

将 duration 配置为 null 即可。

---

````jsx
var notification = require('antd/lib/notification');

var openNotification = function() {
  notification.open({
    message: "这是标题",
    description: "这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案",
    duration: null
  });
};

React.render(
  <button className="ant-btn ant-btn-primary" onClick={openNotification}>显示通知，不自动消失</button>
, document.getElementById('components-notification-demo-duration'));
````

