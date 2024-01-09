import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Flex } from 'antd';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';

const onChange: DatePickerProps<Dayjs[]>['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const App: React.FC = () => (
  <Flex vertical gap="small">
    <DatePicker multiple onChange={onChange} defaultValue={[dayjs('2024-01-01')]} />
    <DatePicker multiple onChange={onChange} picker="week" />
    <DatePicker multiple onChange={onChange} picker="month" />
    <DatePicker multiple onChange={onChange} picker="quarter" />
    <DatePicker multiple onChange={onChange} picker="year" />
  </Flex>
);

export default App;
