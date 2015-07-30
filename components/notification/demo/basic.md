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
  notification.show(args);
};

React.render(
  <button className='ant-btn ant-btn-primary' onClick={openNotification}>基本</button>
, document.getElementById('components-notification-demo-basic'));
````