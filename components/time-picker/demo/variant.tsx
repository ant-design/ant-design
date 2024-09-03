import React from 'react';
import { Flex, TimePicker } from 'antd';

const { RangePicker } = TimePicker;

const App: React.FC = () => (
  <Flex vertical gap={12}>
    <Flex gap={8}>
      <TimePicker placeholder="Filled" />
      <RangePicker placeholder={['Filled', '']} />
    </Flex>
    <Flex gap={8}>
      <TimePicker variant="filled" placeholder="Filled" />
      <RangePicker variant="filled" placeholder={['Filled', '']} />
    </Flex>
    <Flex gap={8}>
      <TimePicker variant="borderless" placeholder="Borderless" />
      <RangePicker variant="borderless" placeholder={['Borderless', '']} />
    </Flex>
  </Flex>
);

export default App;
