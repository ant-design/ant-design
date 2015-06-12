# 基本

- order: 0

第一个对话框。

---

````jsx
var Modal = antd.Modal;

var Test = React.createClass({
  showModal() {
    this.refs.modal.show();
  },
  handleOk() {
    console.log('点击了确定');
    this.refs.modal.hide();
  },
  handleCancel() {
    console.log('点击了取消');
  },
  render() {
    return <div>
      <button className="ant-btn ant-btn-primary" onClick={this.showModal}>显示对话框</button>
      <Modal title="第一个 Modal"
        ref="modal"
        onOk={this.handleOk}
        onCancel={this.handleCancel}>
        <p>对话框的内容</p>
      </Modal>
    </div>;
  }
});

React.render(<Test/> , document.getElementById('components-modal-demo-basic'));
````

