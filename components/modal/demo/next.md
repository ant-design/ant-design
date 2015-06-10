# 确定取消

- order: 1

可以通过 `onOk` 和 `onCancel` 触发下一步的操作。

---

````jsx
var modal = antd.modal;

function showModal() {
  var ref;

  function saveRef(c){
    ref = c;
  }

  modal({
    title: '点击确定取消',
    content: <p>name: <input ref={saveRef}/></p>,
    onCancel: function() {
      alert('cancel');
    },
    onOk: function(close) {
      alert('name: ' + React.findDOMNode(ref).value);
      close();
    }
  });
}

React.render(
  <button className="ant-btn ant-btn-default" onClick={showModal}>显示对话框</button>
, document.getElementById('components-modal-demo-next'));
````
