import React from 'react';
import { Flex, Transfer } from 'antd';

const App: React.FC = () => (
  <Flex gap="middle" vertical>
    <Transfer status="error" />
    <Transfer status="warning" showSearch />
  </Flex>
);

export default App;
