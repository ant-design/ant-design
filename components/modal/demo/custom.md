# 异步关闭

- order: 1

点击确定后异步关闭对话框。

---

````jsx
var Modal = antd.Modal;
var Button = antd.Button;

var ModalText = '对话框的内容';

var Test = React.createClass({
  getInitialState() {
    return {
      ModalText: '对话框的内容',
      visible: false
    };
  },
  showModal() {
    this.setState({
      visible: true
    });
  },
  handleOk() {
    this.setState({
      ModalText: '对话框将在两秒后关闭'
    });
    setTimeout(() => {
      this.setState({
        visible: false
      });
    }, 2000);
  },
  handleCancel() {
    console.log('点击了取消');
    this.setState({
      visible: false
    });
  },
  render() {
    return <div>
      <Button type="primary" onClick={this.showModal}>显示对话框</Button>
      <Modal title="对话框标题"
        visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}>
        <p>{this.state.ModalText}</p>
      </Modal>
    </div>;
  }
});

React.render(<Test/> , document.getElementById('components-modal-demo-custom'));
````
