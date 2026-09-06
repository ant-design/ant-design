import React from 'react';
import { Flex, Progress } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" wrap>
    <Flex vertical align="center" gap="small">
      <Progress type="circle" percent={75} />
      <span>startPosition: 0</span>
    </Flex>
    <Flex vertical align="center" gap="small">
      <Progress type="circle" percent={75} startPosition={25} />
      <span>startPosition: 25</span>
    </Flex>
  </Flex>
);

export default App;
