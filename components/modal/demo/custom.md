# 异步关闭

- order: 1



---

````jsx
var Modal = antd.Modal;
var ModalText = '对话框的内容';

var Test = React.createClass({
  getInitialState() {
    return {
      ModalText: '对话框的内容'
    };
  },
  showModal() {
    this.refs.modal.show();
  },
  handleOk() {
    this.setState({
      ModalText: '对话框将在两秒后关闭'
    });
    setTimeout((function() {
      this.refs.modal.hide();
    }).bind(this), 2000);
  },
  handleCancel() {
    console.log('点击了取消');
  },
  render() {
    return <div>
      <button className="ant-btn ant-btn-primary" onClick={this.showModal}>显示对话框</button>
      <Modal ref="modal"
        title="对话框标题"
        onOk={this.handleOk}
        onCancel={this.handleCancel}>
        <p>{this.state.ModalText}</p>
      </Modal>
    </div>;
  }
});

React.render(<Test/> , document.getElementById('components-modal-demo-custom'));
````
