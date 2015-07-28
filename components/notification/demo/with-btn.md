# 关闭触发回调函数

- order: 2

点击关闭按钮触发回调函数。

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

function callback() {
  alert('我要关闭了！');
}

function openNotification() {
  var args = {
    title: '这是标题',
    message: '这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案',
    btn: true,
    callback: callback
  }; 
  Notification.show(args);
}

React.render(
  <div>
    <button className='ant-btn ant-btn-primary' onClick={openNotification}>关闭按钮触发回调函数</button>
  </div>, document.getElementById('components-notification-demo-with-btn'));
````