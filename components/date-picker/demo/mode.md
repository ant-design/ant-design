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

```tsx
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { Moment } from 'moment';
import React, { useState } from 'react';

const { RangePicker } = DatePicker;

type RangeValue = [Moment | null, Moment | null] | null;

const ControlledDatePicker = () => {
  const [mode, setMode] = useState<DatePickerProps['mode']>('time');

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setMode('time');
    }
  };

  const handlePanelChange: DatePickerProps['onPanelChange'] = (_, newMode) => {
    setMode(newMode);
  };

  return (
    <DatePicker
      mode={mode}
      showTime
      onOpenChange={handleOpenChange}
      onPanelChange={handlePanelChange}
    />
  );
};

const ControlledRangePicker = () => {
  const [mode, setMode] = useState<RangePickerProps['mode']>(['month', 'month']);
  const [value, setValue] = useState<RangeValue>([null, null]);

  const handlePanelChange: RangePickerProps['onPanelChange'] = (newValue, newModes) => {
    setValue(newValue);
    setMode([
      newModes[0] === 'date' ? 'month' : newModes[0],
      newModes[1] === 'date' ? 'month' : newModes[1],
    ]);
  };

  return (
    <RangePicker
      placeholder={['Start month', 'End month']}
      format="YYYY-MM"
      value={value}
      mode={mode}
      onChange={setValue}
      onPanelChange={handlePanelChange}
    />
  );
};

const App: React.FC = () => (
  <Space direction="vertical" size={12}>
    <ControlledDatePicker />
    <ControlledRangePicker />
  </Space>
);

export default App;
```
