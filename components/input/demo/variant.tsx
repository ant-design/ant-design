import React from 'react';
import { Flex, Input } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap={12}>
    <Input placeholder="Outlined" />
    <Input placeholder="Filled" variant="filled" />
    <Input placeholder="Borderless" variant="borderless" />
    <Input placeholder="Underlined" variant="underlined" />
  </Flex>
);

export default App;
