# 日期范围选择

- order: 7

设置 `disabledDate` 方法，来约束开始和结束日期。

---

````jsx
import { Datepicker } from 'antd';

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
    console.log(field,'change',value);
    this.setState({
      [field]: value,
    });
  },
  render() {
    return <div>
      <Datepicker disabledDate={this.disabledStartDate}
        value={this.state.startValue}
        placeholder="开始日期"
        onChange={this.onChange.bind(this,'startValue')} />
      <Datepicker disabledDate={this.disabledEndDate}
        value={this.state.endValue}
        placeholder="结束日期"
        onChange={this.onChange.bind(this,'endValue')} />
    </div>;
  }
});

ReactDOM.render(
  <DateRange />
, document.getElementById('components-datepicker-demo-start-end'));
````
