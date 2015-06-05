# 基本

- order: 0

使用很简单

---

````jsx
var modal = antd.modal;

function show() {
  var ref;

  function saveRef(c){
    ref = c;
  }

  modal({
    title: '第一个 Modal',
    content: <p>name: <input ref={saveRef}/></p>,
    onCancel: function() {
      alert('cancel');
    },
    onOk: function(close) {
      alert('name: '+React.findDOMNode(ref).value);
      setTimeout(close,100);
    }
  });
}

React.render(
  <button onClick={show}>显示对话框</button>
, document.getElementById('components-modal-demo-basic'));
````
