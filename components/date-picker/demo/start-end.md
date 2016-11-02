---
order: 7
title:
  zh-CN: 日期范围一
  en-US: Date range, case 1
---

## zh-CN

可以设置 `disabledDate` 方法，来约束开始和结束日期。

## en-US

You can use the `disabledDate` property to limit the start and end dates.


````jsx
import { DatePicker } from 'antd';

const DateRange = React.createClass({
  getInitialState() {
    return {
      startValue: null,
      endValue: null,
      endOpen: false,
    };
  },
  disabledStartDate(startValue) {
    if (!startValue || !this.state.endValue) {
      return false;
    }
    return startValue.valueOf() > this.state.endValue.valueOf();
  },
  disabledEndDate(endValue) {
    if (!endValue || !this.state.startValue) {
      return false;
    }
    return endValue.valueOf() <= this.state.startValue.valueOf();
  },
  onChange(field, value) {
    this.setState({
      [field]: value,
    });
  },
  onStartChange(value) {
    this.onChange('startValue', value);
  },
  onEndChange(value) {
    this.onChange('endValue', value);
  },
  handleStartOpenChange(open) {
    if (!open) {
      this.setState({ endOpen: true });
    }
  },
  handleEndOpenChange(open) {
    this.setState({ endOpen: open });
  },
  render() {
    return (
      <div>
        <DatePicker
          disabledDate={this.disabledStartDate}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          value={this.state.startValue}
          placeholder="Start"
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
        />
        <DatePicker
          disabledDate={this.disabledEndDate}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          value={this.state.endValue}
          placeholder="End"
          onChange={this.onEndChange}
          open={this.state.endOpen}
          onOpenChange={this.handleEndOpenChange}
        />
      </div>
    );
  },
});

ReactDOM.render(
  <DateRange />
, mountNode);
````
