# 带有Icon的通知提醒框

- order: 2

通知提醒框左侧有Icon图标。

---

````jsx
var notification = require('antd/lib/notification');

var openNotificationWithIcon = function(type) {
  return function(){
    var args = {
      message: "这是标题",
      description: "这是提示框的文案这是提示框示框的文案这是提示是提示框的文案这是提示框的文案"
    };
    notification[type](args);
  };
};

React.render(<div>
  <button className="ant-btn ant-btn-primary" onClick={openNotificationWithIcon('success')}>Success</button>
  <button className="ant-btn ant-btn-primary" onClick={openNotificationWithIcon('info')}>Info</button>
  <button className="ant-btn ant-btn-primary" onClick={openNotificationWithIcon('warn')}>Warn</button>
  <button className="ant-btn ant-btn-primary" onClick={openNotificationWithIcon('error')}>Error</button>
  </div>
, document.getElementById('components-notification-demo-with-icon'));
````
