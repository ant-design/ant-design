# suggest

- order: 4

类似账号注册表单输入框的自动完成功能。

---


````jsx
var Select = antd.Select;
var Option = Select.Option;

var Test = React.createClass({
  getInitialState() {
    return {
      options: []
    };
  },
  handleChange(value) {
    var options;
    if (!value) {
      options = [];
    } else {
      options = ['gmail.com', '163.com', 'qq.com'].map(function(domain) {
        var email = value + '@' + domain;
        return <Option value={email}>{email}</Option>;
      });
    }
    this.setState({
      options: options
    });
  },
  render() {
    return <Select combobox style={{width:200}} onChange={this.handleChange}>
      {this.state.options}
    </Select>;
  }
});

React.render(<Test />, document.getElementById('components-select-demo-combobox'));
````

