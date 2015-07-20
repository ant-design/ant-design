# 不可用

- order: 1

Switch 失效状态。

---

````jsx
var Switch = antd.Switch;
var container = document.getElementById('components-switch-demo-disabled');

var Test = React.createClass({
  getInitialState() {
    return {
      disabled: true
    }
  },
  toggle(){
    this.setState({
      disabled: !this.state.disabled
    });
  },
  render() {
    return <div>
      <Switch disabled={this.state.disabled} />
      <br />
      <br />
      <button className="ant-btn ant-btn-primary" onClick={this.toggle}>Toggle disabled</button>
    </div>;
  }
});

React.render(<Test />, container);
````
