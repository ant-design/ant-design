# 基本

- order: 0

使用很简单

---

````jsx
var modal = antd.modal;

function show(){
  modal({
    width:500,
    title:'第一个 modal',
    content: <p>modal content</p>,
    onCancel:function(){
      alert('cancel');
    },
    onOk:function(){
      alert('ok')
    }
  });
}

React.render(
  <button onClick={show}>show modal</button>
, document.getElementById('components-modal-demo-basic'));
````
