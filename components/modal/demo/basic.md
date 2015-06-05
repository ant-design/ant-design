# 基本

- order: 0

使用很简单

---

````jsx
var modal = antd.modal;

function show() {
  modal({
    title: '第一个 Modal',
    content: <p>Modal content</p>,
    onCancel: function() {
      alert('cancel');
    },
    onOk: function(close) {
      alert('ok');
      setTimeout(close,100);
    }
  });
}

React.render(
  <button onClick={show}>显示对话框</button>
, document.getElementById('components-modal-demo-basic'));
````
