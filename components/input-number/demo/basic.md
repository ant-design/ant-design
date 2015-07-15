# 基本

- order: 0

数字输入框

---

````jsx
var InputNumber = antd.InputNumber;

function onChange(v){
  console.log('changed',v);
}

var Test = React.createClass({
  getInitialState(){
    return {
      disabled:false
    };
  },
  toggle(){
    this.setState({
      disabled:!this.state.disabled
    });
  },
  render(){
    return <div>
             <InputNumber min={1} max={10} disabled={this.state.disabled} defaultValue={3} onChange={onChange} style={{width:100}}/>
             &nbsp;&nbsp;&nbsp;
             <button onClick={this.toggle} className="ant-btn ant-btn-primary"> toggle disabled</button>
           </div>;
  }
});

React.render(<Test />, document.getElementById('components-input-number-demo-basic'));
````

