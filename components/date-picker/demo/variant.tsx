import React from 'react';
import { DatePicker, Flex } from 'antd';

const { RangePicker } = DatePicker;

const App: React.FC = () => (
  <Flex vertical gap={12}>
    <Flex gap={8}>
      <DatePicker placeholder="Outlined" />
      <RangePicker placeholder={['Outlined Start', 'Outlined End']} />
    </Flex>
    <Flex gap={8}>
      <DatePicker placeholder="Filled" variant="filled" />
      <RangePicker placeholder={['Filled Start', 'Filled End']} variant="filled" />
    </Flex>
    <Flex gap={8}>
      <DatePicker placeholder="Borderless" variant="borderless" />
      <RangePicker placeholder={['Borderless Start', 'Borderless End']} variant="borderless" />
    </Flex>
    <Flex gap={8}>
      <DatePicker placeholder="Underlined" variant="underlined" />
      <RangePicker placeholder={['Underlined Start', 'Underlined End']} variant="underlined" />
    </Flex>
  </Flex>
);

export default App;
