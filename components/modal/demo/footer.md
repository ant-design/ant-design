# 自定义页脚

- order: 2

更复杂的例子，自定义了页脚的按钮，点击提交后进入 loading 状态，完成后关闭。

---

````jsx
var Modal = antd.Modal;

var Test = React.createClass({
  getInitialState: function() {
    return {
      loading: false,
      visible: false
    };
  },
  showModal(e) {
    this.setState({ visible: true,mousePosition:{x:e.pageX,y:e.pageY} });
  },
  handleOk() {
    this.setState({ loading: true });
    setTimeout(()=> {
      this.setState({ loading: false, visible: false });
    }, 3000);
  },
  handleCancel() {
    this.setState({ visible: false });
  },
  render() {
    return <div>
      <button className="ant-btn ant-btn-primary" onClick={this.showModal}>
        显示对话框
      </button>
      <Modal ref="modal"
       visible={this.state.visible}
       mousePosition={this.state.mousePosition}
       title="对话框标题" onOk={this.handleOk} onCancel={this.handleCancel}
        footer={[
          <button key="back" className="ant-btn ant-btn-lg" onClick={this.handleCancel}>返 回</button>,
          <button key="submit" className="ant-btn ant-btn-primary ant-btn-lg" onClick={this.handleOk}>
            提 交
            <i className={'anticon anticon-loading'+(this.state.loading?'':'hide')}></i>
          </button>
        ]}>
        <p>对话框的内容</p>
        <p>对话框的内容</p>
        <p>对话框的内容</p>
        <p>对话框的内容</p>
        <p>对话框的内容</p>
      </Modal>
    </div>;
  }
});

React.render(<Test/> , document.getElementById('components-modal-demo-footer'));
````
