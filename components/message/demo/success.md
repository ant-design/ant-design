# 成功

- order: 0

操作成功反馈。

---

````jsx
var message = antd.message;

var success = function() {
  message.success('这是一条成功的提示');
};

React.render(<button className="ant-btn ant-btn-primary" onClick={success}>显示成功提示</button>
, document.getElementById('components-message-demo-success'));
````

