# 基本

- order: 2

全局提示 - 提醒

---

````jsx

var message = antd.message;
var info = function(){
  message.info('这是一条普通的提醒');
}

React.render(
  <button className="ant-btn ant-btn-primary" onClick={info} >显示普通提醒</button>, document.getElementById('components-message-demo-info')
);

````