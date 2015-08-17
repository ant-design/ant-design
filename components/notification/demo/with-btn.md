# 自定义关闭按钮

- order: 4

自定义关闭按钮的样式和文字。

---

````jsx
var notification = require('antd/lib/notification');

var btnClick = function(key) {
  // 隐藏提醒框
  notification.close(key);
};

var close = function(){
  console.log('我被默认的关闭按钮关闭了！');
}

var btn = <button onClick={btnClick} className="ant-btn ant-btn-primary ant-btn-sm">自定义关闭按钮</button>;

var openNotification = function() {
  notification.open({
    message: "这是标题",
    description: "这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案",
    btn: btn,
    btnClose: btnClick,
    onClose: close
  });
};

React.render(
  <div>
    <button className="ant-btn ant-btn-primary" onClick={openNotification}>打开通知提醒框</button>
  </div>,
document.getElementById('components-notification-demo-with-btn'));
````
