# 基本

- order: 0

第一个对话框。

---

````jsx
var Modal = antd.Modal;

var Test = React.createClass({
  getInitialState(){
    return{
      visible:false
    }
  },
  showModal() {
    this.setState({
      visible:true
    });
  },
  handleOk() {
    console.log('点击了确定');
    this.setState({
      visible:false
    });
  },
  handleCancel() {
    console.log('点击了取消');
  },
  render() {
    return <div>
      <button className="ant-btn ant-btn-primary" onClick={this.showModal}>显示对话框</button>
      <Modal title="第一个 Modal"
      visible={this.state.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}>
        <p>对话框的内容</p>
      </Modal>
    </div>;
  }
});

React.render(<Test/> , document.getElementById('components-modal-demo-basic'));
````

