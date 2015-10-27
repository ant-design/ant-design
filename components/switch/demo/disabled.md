# 不可用

- order: 1

Switch 失效状态。

---

````jsx
var Switch = antd.Switch;
var Button = antd.Button;
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
      <Button type="primary" onClick={this.toggle}>Toggle disabled</Button>
    </div>;
  }
});

ReactDOM.render(<Test />, container);
````
