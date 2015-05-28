# 选择日期

- order: 2
- description: 通过设置选择日期的回调事件 `onSelect`，完成交互行为。

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
