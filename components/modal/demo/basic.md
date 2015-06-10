# 基本

- order: 0

使用很简单。

---

````jsx
var Modal = antd.Modal;

var Test = React.createClass({
  getInitialState(){
    return {
      visible:false
    };
  },
  showModal(){
    this.setState({
      visible:true
    });
  },
  handleOk(){
    alert('ok');
    var self = this;
    setTimeout(function(){
      self.setState({
        visible:false
      });
    },200);
  },
  handleCancel(){
    var self = this;
    alert('cancel');
    setTimeout(function(){
        self.setState({
          visible:false
        });
      },200);
  },
  render(){
    return <div>
    <button className="ant-btn ant-btn-primary" onClick={this.showModal}>显示对话框</button>
    <Modal title="第一个 Modal" visible={this.state.visible} onOk={this.handleOk} onBeforeClose={this.handleCancel}><p>对话框的内容</p></Modal>
    </div>;
  }
});

React.render(<Test/> , document.getElementById('components-modal-demo-basic'));
````
