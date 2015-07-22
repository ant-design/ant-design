# 基本

- order: 0

最简单的用法。

---

````jsx
var Notification = require('antd/lib/notification');
var notification = Notification.newInstance({});

var open = function(message, duration, close) {
  var c = close === false ? false : true;
  notification.notice({
    content: <span>{message}</span>,
    duration: duration,
    closable: c
  })
}

function open1() {
  open('这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案', null, 22);
}

function open2() {
  open('这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案', 3 );
}

function open3() {
  open('这是提示框的文案这是提示框的文案', null, 0);
}

function open4() {
  open('这是提示框的文案这是提示框的文案这是提示框的文框的文案这是提示框的文案这是提示框的文案这是提示框的文案这是提示框的文案', 3, true);
}

function open5() {
  open('这是提示框的文案这是提示框的文案这是提示框的文案案这是提示框的文案案这是提示框的文案', 3, false);
}

React.render(
  <div>
    <button className='ant-btn ant-btn-sm ant-btn-primary' onClick={open1}>simple</button>
    <button className='ant-btn ant-btn-sm ant-btn-primary' onClick={open2}>simple</button>
    <button className='ant-btn ant-btn-sm ant-btn-primary' onClick={open3}>simple</button>
    <button className='ant-btn ant-btn-sm ant-btn-primary' onClick={open4}>simple</button>
    <button className='ant-btn ant-btn-sm ant-btn-primary' onClick={open5}>simple</button>
  </div>, document.getElementById('components-notification-demo-basic'));
````