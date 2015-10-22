# 和外部组件通信

- order: 2

联动 checkbox。

---

````jsx
var Checkbox = antd.Checkbox;
var Button = antd.Button;
var container = document.getElementById('components-checkbox-demo-controller');

var App = React.createClass({
  getInitialState() {
    return {
      checked: true,
      disabled: false
    }
  },
  render() {
    var label = (this.state.checked ? '选中' : '取消') + '-' +
      (this.state.disabled ? '不可用' : '可用');
    return <div>
      <p style={{marginBottom: '20px'}}>
        <label>
          <Checkbox checked={this.state.checked}
            disabled={this.state.disabled}
            onChange={this.onChange} />
            {label}
        </label>
      </p>
      <p>
        <Button type="primary" size="sm"
          onClick={this.toggleChecked}>
          {!this.state.checked ? "选中":"取消"}
        </Button>
        <Button style={{'marginLeft': '10px'}}
          type="primary" size="sm"
          onClick={this.toggleDisable}>
          {!this.state.disabled ? "不可用":"可用"}
        </Button>
      </p>
    </div>;
  },
  toggleChecked(e) {
    this.setState({checked: !this.state.checked});
  },
  toggleDisable(e) {
    this.setState({disabled: !this.state.disabled});
  },
  onChange(e) {
    console.log('checked = ', e.target.checked);
    this.setState({
      checked: e.target.checked
    });
  }
});

ReactDOM.render(<App />, container);
````
