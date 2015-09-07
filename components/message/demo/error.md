# 错误或失败

- order: 1

操作失败反馈。

---

````jsx

var message = antd.message;
var error = function() {
  message.error('这是一条失败的提示这是一条失败的提示这是一条失败的提示');
};

React.render(<button className="ant-btn ant-btn-primary" onClick={error}>显示失败提示</button>
, document.getElementById('components-message-demo-error'));
````
