# 基本

- order: 0

第一个对话框。

---

````jsx
var Modal = antd.Modal;

var App = React.createClass({
  getInitialState() {
    return { visible: false };
  },
  showModal() {
    this.setState({
      visible: true
    });
  },
  handleOk() {
    console.log('点击了确定');
    this.setState({
      confirmLoading: false,
      visible: false
    });
  },
  handleCancel() {
    this.setState({
      visible: false
    });
  },
  render() {
    return <div>
      <button className="ant-btn ant-btn-primary" onClick={this.showModal}>显示对话框</button>
      <Modal title="第一个 Modal" visible={this.state.visible}
        confirmLoading={this.state.confirmLoading} onOk={this.handleOk} onCancel={this.handleCancel}>
        <p>对话框的内容</p>
        <p>对话框的内容</p>
        <p>对话框的内容</p>
      </Modal>
    </div>;
  }
});

React.render(<App /> , document.getElementById('components-modal-demo-basic'));
````
