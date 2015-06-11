# 基本

- order: 0

使用很简单。

---

````jsx
var confirm = antd.confirm;

function showConfirm(){
  confirm({
    title: '第一个 confirm',
    content: 'confirm 内容'
  });
}

React.render(
<button className="ant-btn ant-btn-primary" onClick={showConfirm}>
  显示确认框
</button>, document.getElementById('components-confirm-demo-basic'));
````
