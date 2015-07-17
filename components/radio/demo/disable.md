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
      disabled: true
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
      <div style={{"margin-top": 20}}>
        <button className="ant-btn ant-btn-primary" onClick={this.toggleDisabled}>
          Toggle disabled
        </button>
      </div>
    </div>;
  }
});

React.render(<App />, document.getElementById('components-radio-demo-disable'));
````
