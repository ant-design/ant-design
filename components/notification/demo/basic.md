# 基本

- order: 0

最简单的用法，五秒后自动关闭。

---

````jsx
var notification = antd.Notification;

var openNotification = function() {
  notification.open({
    message: "这是标题",
    description: "这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案"
  });
};

React.render(
  <div>
    <button className='ant-btn ant-btn-primary' onClick={openNotification}>打开通知提醒框</button>
  </div>,
document.getElementById('components-notification-demo-basic'));
````
