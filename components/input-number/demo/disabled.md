# 不可用

- order: 0

点击按钮切换可用状态。

---

````jsx
var InputNumber = antd.InputNumber;

var Test = React.createClass({
  getInitialState() {
    return {
      disabled:false
    };
  },
  toggle() {
    this.setState({
      disabled: !this.state.disabled
    });
  },
  render() {
    return <div>
      <InputNumber min={1} max={10} disabled={this.state.disabled} defaultValue={3} style={{width:100}} />
      <br />
      <br />
      <button onClick={this.toggle} className="ant-btn ant-btn-primary">Toggle disabled</button>
    </div>;
  }
});

React.render(<Test />, document.getElementById('components-input-number-demo-disabled'));
````
