# 自动关闭的延时

- order: 1

自定义通知框自动关闭的延时，默认`4.5s`，取消自动关闭只要将该值设为 `0` 即可。

---

````jsx
var notification = antd.Notification;

var openNotification = function() {
  var args = {
    message: "这是标题",
    description: "这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案",
    duration: 10
  };
  notification.open(args);
};

React.render(
  <button className='ant-btn ant-btn-primary' onClick={openNotification}>打开通知提醒框</button>
, document.getElementById('components-notification-demo-duration'));
````
