# 手动关闭

- order: 1

给提示框添加一个关闭按钮，鼠标单击立即关闭提示框。

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
    message: '这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案',
    close: true
  }; 
  Notification.show(args);
}

React.render(
  <div>
    <button className='ant-btn ant-btn-primary' onClick={openNotification}>手动关闭</button>
  </div>, document.getElementById('components-notification-demo-close'));
````