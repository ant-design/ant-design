import React from 'react';
import { Flex, Rate } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="medium">
    <Rate size="large" />
    <Rate />
    <Rate size="small" />
  </Flex>
);

export default App;
