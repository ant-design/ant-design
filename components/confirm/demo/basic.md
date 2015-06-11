# 基本

- order: 0

使用很简单。

---

````jsx
var confirm = antd.confirm;

var Test = React.createClass({
  getInitialState(){
    return {
      visible:false
    };
  },
  showConfirm(){
    confirm({
    title:"第一个 confirm",
    content:"confirm 内容",
    onOk:this.handleOk,
    onCancel:this.handleCancel
    })
  },
  handleOk(close){
    close();
  },
  handleCancel(close){
    close();
  },
  render(){
    return <div>
    <button className="ant-btn ant-btn-primary" onClick={this.showConfirm}>显示确认框</button>
    </div>;
  }
});

React.render(<Test/> , document.getElementById('components-confirm-demo-basic'));
````
