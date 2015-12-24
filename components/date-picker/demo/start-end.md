# 日期范围一

- order: 7

可以设置 `disabledDate` 方法，来约束开始和结束日期。

---

````jsx
import { DatePicker } from 'antd';

const DateRange = React.createClass({
  getInitialState() {
    return {
      startValue: null,
      endValue: null
    };
  },
  disabledStartDate(startValue) {
    if (!startValue || !this.state.endValue) {
      return false;
    }
    return startValue.getTime() >= this.state.endValue.getTime();
  },
  disabledEndDate(endValue) {
    if (!endValue || !this.state.startValue) {
      return false;
    }
    return endValue.getTime() <= this.state.startValue.getTime();
  },
  onChange(field, value) {
    console.log(field, 'change', value);
    this.setState({
      [field]: value,
    });
  },
  render() {
    return <div>
      <DatePicker disabledDate={this.disabledStartDate}
        value={this.state.startValue}
        placeholder="开始日期"
        onChange={this.onChange.bind(this, 'startValue')} />
      <DatePicker disabledDate={this.disabledEndDate}
        value={this.state.endValue}
        placeholder="结束日期"
        onChange={this.onChange.bind(this, 'endValue')} />
    </div>;
  }
});

ReactDOM.render(
  <DateRange />
, document.getElementById('components-date-picker-demo-start-end'));
````
