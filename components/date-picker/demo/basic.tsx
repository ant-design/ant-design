import React from 'react';
import type { DatePickerProps } from 'antd';
import { DatePicker, Flex } from 'antd';

const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};

const Demo: React.FC = () => (
  <Flex gap="small" justify="flex-start" align="flex-start" vertical>
    <DatePicker onChange={onChange} />
    <DatePicker onChange={onChange} picker="week" />
    <DatePicker onChange={onChange} picker="month" />
    <DatePicker onChange={onChange} picker="quarter" />
    <DatePicker onChange={onChange} picker="year" />
  </Flex>
);

export default Demo;
