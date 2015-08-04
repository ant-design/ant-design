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
  <button className="ant-btn" onClick={openNotificationWithIcon('success')}>成功</button>
  <button className="ant-btn" onClick={openNotificationWithIcon('info')}>消息</button>
  <button className="ant-btn" onClick={openNotificationWithIcon('warn')}>警告</button>
  <button className="ant-btn" onClick={openNotificationWithIcon('error')}>错误</button>
  </div>
, document.getElementById('components-notification-demo-with-icon'));
````

<style>
.code-box-demo .ant-btn {
  margin-right: 1em;
}
</style>
