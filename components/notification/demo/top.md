# 距离顶部距离

- order: 1

自定义通知框距离顶部的距离， **只在初始化时设置有效** ，默认距离顶部`24px`。

---

````jsx
var notification = require('antd/lib/notification');

var openNotification = function() {
  var args = {
    message: "这是标题",
    description: "这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案",
    top: 100
  };
  notification.open(args);
};

React.render(
  <button className='ant-btn ant-btn-primary' onClick={openNotification}>距离顶部100px</button>
, document.getElementById('components-notification-demo-top'));
````