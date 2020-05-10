---
order: 99
title:
  zh-CN: 自定义日期范围选择
  en-US: Customized Range Picker
debug: true
---

## zh-CN

当 `RangePicker` 无法满足业务需求时，可以使用两个 `DatePicker` 实现类似的功能。

> - 通过设置 `disabledDate` 方法，来约束开始和结束日期。
> - 通过 `open` `onOpenChange` 来优化交互。

## en-US

When `RangePicker` does not satisfied your requirements, try to implement similar functionality with two `DatePicker`.

> - Use the `disabledDate` property to limit the start and end dates.
> - Improve user experience with `open` and `onOpenChange`.

```jsx
import { DatePicker } from 'antd';

class DateRange extends React.Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
  };

  disabledStartDate = startValue => {
    const { endValue } = this.state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const { startValue } = this.state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  };

  onStartChange = value => {
    this.onChange('startValue', value);
  };

  onEndChange = value => {
    this.onChange('endValue', value);
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  render() {
    const { startValue, endValue, endOpen } = this.state;
    return (
      <div>
        <DatePicker
          disabledDate={this.disabledStartDate}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          value={startValue}
          placeholder="Start"
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
        />
        <DatePicker
          disabledDate={this.disabledEndDate}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          value={endValue}
          placeholder="End"
          onChange={this.onEndChange}
          open={endOpen}
          onOpenChange={this.handleEndOpenChange}
        />
      </div>
    );
  }
}

ReactDOM.render(<DateRange />, mountNode);
```
