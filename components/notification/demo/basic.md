# 基本

- order: 0

最简单的用法。

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
  open('这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案');
}

React.render(
  <div>
    <button className='ant-btn ant-btn-primary' onClick={openNotification}>基本</button>
  </div>, document.getElementById('components-notification-demo-basic'));
````