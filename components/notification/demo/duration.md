# 自定义显示时间

- order: 2

自定义通知框显示的时间，默认`1.5s`。

---

````jsx
var Notification = require('antd/lib/notification');
var notification = Notification.newInstance({
  prefixCls: 'ant-notification',
  style: {
    top: 0,
    right: 0
  }
});

var open = function(message, close, duration) {
  notification.notice({
    content: <span>{message}</span>,
    duration: duration,
    closable: close,
    style: {}
  })
}

function openNotification() {
  open('这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案', true, 5);
}

React.render(
  <div>
    <button className='ant-btn ant-btn-primary' onClick={openNotification}>自定义显示时间</button>
  </div>, document.getElementById('components-notification-demo-duration'));
````