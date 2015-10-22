# 确认对话框

- order: 3

使用 `confirm()` 可以快捷地弹出确认框。

---

````jsx
var confirm = antd.Modal.confirm;
var Button = antd.Button;

function showConfirm(){
  confirm({
    title: '您是否确认要删除这项内容',
    content: '一些解释',
    onOk: function() {
      alert('确定');
    },
    onCancel: function() {}
  });
}

ReactDOM.render(
<Button onClick={showConfirm}>
  确认对话框
</Button>, document.getElementById('components-modal-demo-confirm'));
````
