# 基本

- order: 0

使用很简单。

---

````jsx
var modal = antd.modal;

function showModal() {
  modal({
    title: '第一个 Modal',
    content: <p>对话框的内容</p>
  });
}

React.render(
  <button className="ant-btn ant-btn-primary" onClick={showModal}>显示对话框</button>
, document.getElementById('components-modal-demo-basic'));
````
