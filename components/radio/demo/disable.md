# 不可用

- order: 1

Radio 不可用。

---

````jsx
var Radio = antd.Radio;

function toggleDisabled() {
  disabled = !disabled;
}

var App = React.createClass({
  getInitialState() {
    return {
      disabled: false
    };
  },
  toggleDisabled() {
    this.setState({
      disabled: !this.state.disabled
    });
  },
  render() {
    return <div>
      <Radio defaultChecked={false} disabled={this.state.disabled} /> 不可用
      <br />
      <Radio defaultChecked={true} disabled={this.state.disabled} /> 不可用
      <br />
      <br />
      <button className="ant-btn ant-btn-primary" onClick={this.toggleDisabled}>
        Toggle disabled
      </button>
    </div>;
  }
});

React.render(<App />, document.getElementById('components-radio-demo-disable'));
````
