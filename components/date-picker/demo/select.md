# 选择日期

- order: 2

通过设置选择日期的回调事件 `onChange`，完成交互行为。

---

````jsx
import { DatePicker } from 'antd';

const Picker = React.createClass({
  handleChange: function(value) {
    console.log(new Date(value.getTime()));
  },
  render: function() {
    return <DatePicker onChange={this.handleChange} />;
  }
});

ReactDOM.render(
  <Picker />
, document.getElementById('components-date-picker-demo-select'));
````
