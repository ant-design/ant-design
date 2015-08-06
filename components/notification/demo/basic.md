# 基本

- order: 0

最简单的用法。

---

````jsx
var notification = require('antd/lib/notification');

var openNotification = function() {
  var args = {
    message: "这是标题",
    description: "这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案"
  };
  notification.open(args);
};

React.render(
  <div>
    <button className='ant-btn ant-btn-primary' onClick={openNotification}>打开通知提醒框</button>
  </div>,
document.getElementById('components-notification-demo-basic'));
````