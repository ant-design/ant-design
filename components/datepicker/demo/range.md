# 范围

- order: 3
- description: 设置可选日期的范围，用 disabled 方法来定义不可选择时间。

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


