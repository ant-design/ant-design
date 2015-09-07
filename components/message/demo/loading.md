# 加载中

- order: 5

进行全局 loading，异步自行移除。

---

````jsx
var message = antd.message;

var success = function() {
  var hide = message.loading('正在执行中...', 0);
  // 异步手动移除
  setTimeout(hide, 2500);
};

React.render(<button className="ant-btn" onClick={success}>显示加载中...</button>
, document.getElementById('components-message-demo-loading'));
````
