import React from 'react';
import { DatePicker, Flex } from 'antd';
import dayjs from 'dayjs';

const defaultValue = Array.from({ length: 10 }).map((_, i) => dayjs('2000-01-01').add(i, 'day'));

const App: React.FC = () => (
  <Flex vertical gap="small">
    <DatePicker multiple placeholder="Bamboo" />
    <DatePicker multiple defaultValue={defaultValue} size="small" />
    <DatePicker multiple defaultValue={defaultValue} />
    <DatePicker multiple defaultValue={defaultValue} size="large" />
  </Flex>
);

export default App;
