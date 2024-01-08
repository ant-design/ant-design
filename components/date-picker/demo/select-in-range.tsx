import React, { useState } from 'react';
import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

type RangeValue = [Dayjs | null, Dayjs | null] | null;

const App: React.FC = () => {
  const [value, setValue] = useState<RangeValue>(
    // null
    [dayjs('2000-01-01'), dayjs('2000-01-31')],
  );

  const disabledDate: DatePickerProps['disabledDate'] = (current, { from }) => {
    return true;

    if (from) {
      return Math.abs(current.diff(from, 'days')) > 7;
    }

    return false;
  };

  return <RangePicker value={value} disabledDate={disabledDate} onChange={setValue} open />;
};

export default App;
