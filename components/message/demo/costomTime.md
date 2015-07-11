
# 基本

- order: 4

全局提示 - 操作成功提示,并自定义时长10s，默认时长2.5s

---

````jsx

var message = antd.message;
var success = function(){
  message.success('这是一条成功的提示,并将于10秒后消失',10);
}

React.render(
  <button className="ant-btn ant-btn-primary" onClick={success} >（自定义时长）显示成功提示</button>, document.getElementById('components-message-demo-costomtime')
);

````

