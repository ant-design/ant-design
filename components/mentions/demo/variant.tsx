import React from 'react';
import { Flex, Mentions } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap={12}>
    <Mentions placeholder="Outlined" />
    <Mentions placeholder="Filled" variant="filled" />
    <Mentions placeholder="Borderless" variant="borderless" />
    <Mentions placeholder="Underlined" variant="underlined" />
  </Flex>
);

export default App;
