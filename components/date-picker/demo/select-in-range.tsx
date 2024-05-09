import React from 'react';
import { DatePicker, Space, Typography } from 'antd';
import type { DatePickerProps } from 'antd';

const { RangePicker } = DatePicker;

// Disabled 7 days from the selected date
const disabled7DaysDate: DatePickerProps['disabledDate'] = (current, { from }) => {
  if (from) {
    return Math.abs(current.diff(from, 'days')) >= 7;
  }

  return false;
};

// Disabled 6 months from the selected date
const disabled6MonthsDate: DatePickerProps['disabledDate'] = (current, { from }) => {
  if (from) {
    const curMonth = current.year() * 12 + current.month();
    const fromMonth = from.year() * 12 + from.month();
    return Math.abs(fromMonth - curMonth) >= 6;
  }

  return false;
};

const App: React.FC = () => (
  <Space direction="vertical">
    <Typography.Title level={5}>7 days range</Typography.Title>
    <RangePicker disabledDate={disabled7DaysDate} />

    <Typography.Title level={5}>6 months range</Typography.Title>
    <RangePicker disabledDate={disabled6MonthsDate} picker="month" />
  </Space>
);

export default App;
