# 范围

- order: 3
- description: 设置可选日期的范围

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
, document.getElementById('components-datepicker-demo-range'));
````


