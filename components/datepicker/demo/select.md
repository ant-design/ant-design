# 基本

- description: 选择日期的回调

---

````jsx
var Datepicker = antd.datepicker;

var Picker = React.createClass({
  handleChange: function(value) {
    console.log(new Date(value.getTime()));
  },
  render: function() {
    return <Datepicker onSelect={this.handleChange} />
  }
});

React.render(
  <Picker />
, document.getElementById('components-datepicker-demo-select'));
````

