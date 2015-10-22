# 基本

- order: 0

最简单的用法，五秒后自动关闭。

---

````jsx
var notification = antd.Notification;
var Button = antd.Button;

var openNotification = function() {
  notification.open({
    message: "这是标题",
    description: "这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案"
  });
};

ReactDOM.render(
  <div>
    <Button type="primary" onClick={openNotification}>打开通知提醒框</Button>
  </div>,
document.getElementById('components-notification-demo-basic'));
````
