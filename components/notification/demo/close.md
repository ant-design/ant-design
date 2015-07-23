# 手动关闭

- order: 1

给提示框添加一个关闭按钮，鼠标单击立即关闭提示框。

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
  open('这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案', true);
}

React.render(
  <div>
    <button className='ant-btn ant-btn-primary' onClick={openNotification}>手动关闭</button>
  </div>, document.getElementById('components-notification-demo-close'));
````