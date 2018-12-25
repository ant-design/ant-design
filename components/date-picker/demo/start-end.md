---
order: 6
title:
  zh-CN: 自定义日期范围选择
  en-US: Customized Range Picker
---

## zh-CN

当 `RangePicker` 无法满足业务需求时，可以使用两个 `DatePicker` 实现类似的功能。
> * 通过设置 `disabledDate`和`disabledTime` 方法，来约束开始和结束日期。
> * 通过 `open` `onOpenChange` 来优化交互。

## en-US

When `RangePicker` does not satisfied your requirements, try to implement similar functionality with two `DatePicker`.
> * Use the `disabledDate` and `disabledTime` property to limit the start and end dates.
> * Improve user experience with `open` and `onOpenChange`.

````jsx
import { DatePicker } from 'antd';

class DateRange extends React.Component {
  state = {
    startValue: null,
    endValue: null,
    endOpen: false,
  };

  range = (start, end) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  }

  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return !startValue.isSame(endValue, 'day') && startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return !endValue.isSame(startValue, 'day') && endValue.valueOf() <= startValue.valueOf();
  }

  disabledStartTime = (startValue) => {
    const disabledHours = () => {
      const endValue = this.state.endValue;
      if (!startValue || !endValue) return [];
      return this.range(0, 24).filter(hour => startValue.isSame(endValue, 'day') && hour > endValue.hour());
    }
    const disabledMinutes = (hour) => {
      const endValue = this.state.endValue;
      if (!startValue || !endValue) return [];
      return this.range(0, 60).filter(minute => (
        startValue.isSame(endValue, 'day') &&
        hour === endValue.hour() &&
        minute > endValue.minute()
      ));
    }

    const disabledSeconds = (hour, minute) => {
      const endValue = this.state.endValue;
      if (!startValue || !endValue) return [];
      return this.range(0, 60).filter(second => (
        startValue.isSame(endValue, 'day') &&
        hour === endValue.hour() &&
        minute === endValue.minute() &&
        second > endValue.second()
      ));
    }

    return {
      disabledHours,
      disabledMinutes,
      disabledSeconds,
    }
  }

  disabledEndTime = (endValue) => {
    console.log(endValue);
    const disabledHours = () => {
      const startValue = this.state.startValue;
      if (!startValue || !endValue) return [];
      return this.range(0, 24).filter(hour => startValue.isSame(endValue, 'day') && hour < startValue.hour());
    }
    const disabledMinutes = (hour) => {
      const startValue = this.state.startValue;
      if (!startValue || !endValue) return [];
      return this.range(0, 60).filter(minute => (
        startValue.isSame(endValue, 'day') &&
        hour === startValue.hour() &&
        minute < startValue.minute()
      ));
    }

    const disabledSeconds = (hour, minute) => {
      const startValue = this.state.startValue;
      if (!startValue || !endValue) return [];
      return this.range(0, 60).filter(second => (
        startValue.isSame(endValue, 'day') &&
        hour === startValue.hour() &&
        minute === startValue.minute() &&
        second < startValue.second()
      ));
    }

    return {
      disabledHours,
      disabledMinutes,
      disabledSeconds,
    }
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({ endOpen: open });
  }

  render() {
    const { startValue, endValue, endOpen } = this.state;
    return (
      <div>
        <DatePicker
          disabledDate={this.disabledStartDate}
          disabledTime={this.disabledStartTime}
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          value={startValue}
          placeholder="Start"
          onChange={this.onStartChange}
          onOpenChange={this.handleStartOpenChange}
        />
        <DatePicker
          disabledDate={this.disabledEndDate}
          disabledTime={this.disabledEndTime}
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
````
