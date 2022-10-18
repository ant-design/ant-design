import React, { useState } from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

type RangeValue = [Dayjs | null, Dayjs | null] | null;

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
