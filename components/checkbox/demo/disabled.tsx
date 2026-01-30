import React from 'react';
import { Checkbox, Flex } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Checkbox defaultChecked={false} disabled />
    <Checkbox indeterminate disabled />
    <Checkbox defaultChecked disabled />
  </Flex>
);

export default App;
