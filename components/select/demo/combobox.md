# suggest

- order: 4

类似 Google 搜索的输入框自动提示功能。

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
    var options = ['gmail.com', '163.com', 'qq.com'].map(function(domain) {
      var email = value + '@' + domain;
      return <Option value={email}>{email}</Option>;
    });
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

