# 确认对话框

- order: 5

使用 `confirm()` 可以快捷地弹出确认框。onCancel/onOk 返回 promise 可以延迟关闭

---

````jsx
var confirm = antd.Modal.confirm;
var Button = antd.Button;

function showConfirm(){
  confirm({
    title: '您是否确认要删除这项内容',
    content: '一些解释',
    onOk: function() {
      alert('1 秒后关闭');
      return new Promise(function(resolve) {
        setTimeout(resolve, 1000);
      });
    },
    onCancel: function() {}
  });
}

ReactDOM.render(
<Button onClick={showConfirm}>
  确认对话框
</Button>, document.getElementById('components-modal-demo-confirm-promise'));
````
