import React, { useState } from 'react';
import type { Dayjs } from 'dayjs';
import { DatePicker, Space } from 'antd';

const App: React.FC = () => {
  const [startValue, setStartValue] = useState<Dayjs | null>(null);
  const [endValue, setEndValue] = useState<Dayjs | null>(null);
  const [endOpen, setEndOpen] = useState(false);

  const disabledStartDate = (startDate: Dayjs) => {
    if (!startDate || !endValue) {
      return false;
    }
    return startDate.valueOf() > endValue.valueOf();
  };

  const disabledEndDate = (endDate: Dayjs) => {
    if (!endDate || !startValue) {
      return false;
    }
    return endDate.valueOf() <= startValue.valueOf();
  };

  const handleStartOpenChange = (open: boolean) => {
    if (!open) {
      setEndOpen(true);
    }
  };

  const handleEndOpenChange = (open: boolean) => {
    setEndOpen(open);
  };

  return (
    <Space>
      <DatePicker
        disabledDate={disabledStartDate}
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        value={startValue}
        placeholder="Start"
        onChange={setStartValue}
        onOpenChange={handleStartOpenChange}
      />
      <DatePicker
        disabledDate={disabledEndDate}
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        value={endValue}
        placeholder="End"
        onChange={setEndValue}
        open={endOpen}
        onOpenChange={handleEndOpenChange}
      />
    </Space>
  );
};

export default App;
