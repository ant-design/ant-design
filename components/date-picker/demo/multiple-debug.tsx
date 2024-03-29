import React from 'react';
import { DatePicker, Flex } from 'antd';
import dayjs from 'dayjs';

const defaultValue = new Array(10).fill(0).map((_, index) => dayjs('2000-01-01').add(index, 'day'));

const App: React.FC = () => (
  <Flex vertical gap="small">
    <DatePicker multiple defaultValue={defaultValue} size="small" />
    <DatePicker multiple defaultValue={defaultValue} />
    <DatePicker multiple defaultValue={defaultValue} size="large" />
  </Flex>
);

export default App;
