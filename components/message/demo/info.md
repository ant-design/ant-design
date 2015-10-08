# 普通提示

- order: 2

信息提醒反馈。

---

````jsx
var Button = antd.Button;

var message = antd.message;
var info = function() {
  message.info('这是一条普通的提醒');
};

React.render(<Button type="primary" onClick={info}>显示普通提醒</Button>
, document.getElementById('components-message-demo-info'));
````
