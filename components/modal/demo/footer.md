# 自定义页脚

- order: 2

更复杂的例子，点击提交后进入 loading 状态，完成后关闭。

---

````jsx
var Modal = antd.Modal;

var Test = React.createClass({
  getInitialState: function() {
    return {
      loading: false
    };
  },
  showModal() {
    this.refs.modal.show();
  },
  handleOk() {
    this.setState({
      loading: true
    });
    setTimeout(()=> {
      this.refs.modal.hide();
      this.setState({
        loading: false
      });
    }, 3000);
  },
  handleCancel() {
    this.refs.modal.hide();
  },
  render() {
    return <div>
      <button className="ant-btn ant-btn-primary" onClick={this.showModal}>
        显示对话框
      </button>
      <Modal ref="modal"
        title="对话框标题"
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={[
          <button className="ant-btn" onClick={this.handleCancel}>返 回</button>,
          <button className="ant-btn ant-btn-primary" onClick={this.handleOk}>
            提 交 <i className={'anticon anticon-loading'+(this.state.loading?'':'hide')}></i>
          </button>
        ]}>
        <p>对话框的内容</p>
      </Modal>
    </div>;
  }
});

React.render(<Test/> , document.getElementById('components-modal-demo-footer'));
````
