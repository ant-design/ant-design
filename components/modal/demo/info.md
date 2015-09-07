# 信息提示

- order: 5

各种类型的信息提示，只有一个 `确认` 按钮。

---

````jsx
var Modal = antd.Modal;

function info() {
  Modal.info({
    title: '这是一条通知信息',
    content: '一些附加信息一些附加信息一些附加信息',
    onOk: function() {}
  });
}

function success() {
  Modal.success({
    title: '这是一条通知信息',
    content: '一些附加信息一些附加信息一些附加信息'
  });
}

function error() {
  Modal.error({
    title: '这是一条通知信息',
    content: '一些附加信息一些附加信息一些附加信息'
  });
}

React.render(<div>
  <button className="ant-btn" onClick={info}>信息提示</button>
  <button className="ant-btn" onClick={success}>成功提示</button>
  <button className="ant-btn" onClick={error}>失败提示</button>
</div>, document.getElementById('components-modal-demo-info'));
````

