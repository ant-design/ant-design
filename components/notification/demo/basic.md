# 基本

- order: 0

最简单的用法。

---

````jsx
var Notification = require('antd/lib/notification');

if(!Notification.notification){
  Notification.notification = Notification.newInstance({
    prefixCls: 'ant-notification',
    style: {
      top: 0,
      right: 0
    }
  });
}

function openNotification() {
  var args = {
    message: '这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案'
  }; 
  Notification.show(args);
}

React.render(
  <div>
    <button className='ant-btn ant-btn-primary' onClick={openNotification}>基本</button>
  </div>, document.getElementById('components-notification-demo-basic'));
````