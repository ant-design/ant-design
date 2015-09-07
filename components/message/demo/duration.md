# 修改延时

- order: 4

自定义时长 `10s`，默认时长为 `1.5s`。

---

````jsx

var message = antd.message;
var success = function() {
  message.success('这是一条成功的提示,并将于10秒后消失', 10);
};

React.render(<button className="ant-btn ant-btn-primary" onClick={success}>自定义时长提示</button>
, document.getElementById('components-message-demo-duration'));
````

