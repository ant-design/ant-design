# 加载中

- order: 5

进行全局 loading，异步自行移除。

---

````jsx
var Button = antd.Button;

var message = antd.message;
var success = function() {
  var hide = message.loading('正在执行中...', 0);
  // 异步手动移除
  setTimeout(hide, 2500);
};

ReactDOM.render(<Button onClick={success}>显示加载中...</Button>
, document.getElementById('components-message-demo-loading'));
````
