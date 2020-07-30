---
order: 20
title:
  zh-CN: 切换类型
  en-US: Change Type
---

## zh-CN

切换不同类型的选择器。

## en-US

Switch different type of Picker.

```jsx
import { DatePicker, TimePicker, Select } from 'antd';

const { Option } = Select;

function TypeSelect({ type, onChange }) {
  return (
    <Select value={type} onChange={onChange} style={{ marginRight: 8 }}>
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
    <>
      <TypeSelect type={type} onChange={setType} />
      <PickerWithType type={type} onChange={onChange} />
    </>
  );
}

ReactDOM.render(<SwitchablePicker />, mountNode);
```
