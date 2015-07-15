# 简单

- order: 1

最简单的用法。

---

````jsx
var Switch = antd.Switch;
var container = document.getElementById('components-switch-demo-disabled');

var Test = React.createClass({
  getInitialState() {
    return {
      disabled: false
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
      <button className="ant-btn atn-btn-primary" onClick={this.toggle}>Toggle disabled</button>
    </div>;
  }
});

React.render(<Test />, container);
````
