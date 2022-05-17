---
order: 99
title:
  zh-CN: 受控面板
  en-US: Controlled Panels
debug: true
---

## zh-CN

通过组合 `mode` 与 `onPanelChange` 控制要展示的面板。

## en-US

Determing which panel to show with `mode` and `onPanelChange`.

```jsx
import React, { useState } from 'react';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;

function ControlledDatePicker() {
  const [mode, setMode] = useState('time');

  const handleOpenChange = open => {
    if (open) {
      setMode('time');
    }
  };

  const handlePanelChange = (value, dateMode) => {
    setMode(dateMode);
  };

  return (
    <DatePicker
      mode={mode}
      showTime
      onOpenChange={handleOpenChange}
      onPanelChange={handlePanelChange}
    />
  );
}

function ControlledRangePicker() {
  const [mode, setMode] = useState(['month', 'month']);
  const [value, setValue] = useState([]);

  const handlePanelChange = (dateValue, dateMode) => {
    setValue(dateValue);
    setMode([
      dateMode[0] === 'date' ? 'month' : dateMode[0],
      dateMode[1] === 'date' ? 'month' : dateMode[1],
    ]);
  };

  const handleChange = dateValue => {
    setValue(dateValue);
  };

  return (
    <RangePicker
      placeholder={['Start month', 'End month']}
      format="YYYY-MM"
      value={value}
      mode={mode}
      onChange={handleChange}
      onPanelChange={handlePanelChange}
    />
  );
}

export default () => (
  <Space direction="vertical" size={12}>
    <ControlledDatePicker />
    <ControlledRangePicker />
  </Space>
);
```
