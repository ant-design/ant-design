---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

最简单的用法，在浮层中可以选择或者输入日期。

## en-US

Basic use case. Users can select or input a date in panel.

```jsx
import { DatePicker, TimePicker, Select, Space } from 'antd';

const { Option } = Select;

function TypeSelect({ type, onChange }) {
  return (
    <Select value={type} onChange={onChange}>
      <Option value="time">Time</Option>
      <Option value="date">Date</Option>
      <Option value="week">Week</Option>
      <Option value="month">Month</Option>
      <Option value="quarter">Quarter</Option>
      <Option value="year">Year</Option>
    </Select>
  );
}

function PickerWithType({ type, onChange }) {
  if (type === 'time') return <TimePicker onChange={onChange} />;
  if (type === 'date') return <DatePicker onChange={onChange} />;
  return <DatePicker picker={type} onChange={onChange} />;
}

function SwitchablePicker() {
  const [type, setType] = React.useState('time');
  const onChange = value => {
    console.log(value);
  };
  return (
    <Space>
      <TypeSelect type={type} onChange={setType} />
      <PickerWithType type={type} onChange={onChange} />
    </Space>
  );
}

ReactDOM.render(
  <Space direction="vertical" size={12}>
    <DatePicker />
    <SwitchablePicker />
  </Space>,
  mountNode,
);
```
