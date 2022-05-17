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
import { DatePicker, Space } from 'antd';

export default () => {
  const [state, setState] = React.useState({
    startValue: null,
    endValue: null,
    endOpen: false,
  });

  const disabledStartDate = startValue => {
    const { endValue } = state;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  const disabledEndDate = endValue => {
    const { startValue } = state;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  const onChange = (field, value) => {
    setState({
      ...state,
      [field]: value,
    });
  };

  const onStartChange = value => {
    onChange('startValue', value);
  };

  const onEndChange = value => {
    onChange('endValue', value);
  };

  const handleStartOpenChange = open => {
    if (!open) {
      setState({ ...state, endOpen: true });
    }
  };

  const handleEndOpenChange = open => {
    setState({ ...state, endOpen: true });
  };

  return (
    <Space>
      <DatePicker
        disabledDate={disabledStartDate}
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        value={state.startValue}
        placeholder="Start"
        onChange={onStartChange}
        onOpenChange={handleStartOpenChange}
      />
      <DatePicker
        disabledDate={disabledEndDate}
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        value={state.endValue}
        placeholder="End"
        onChange={onEndChange}
        open={state.endOpen}
        onOpenChange={handleEndOpenChange}
      />
    </Space>
  );
};
```
