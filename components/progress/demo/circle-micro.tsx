import React from 'react';
import { Flex, Progress } from 'antd';

const App: React.FC = () => (
  <Flex align="center" gap="small">
    <Progress
      type="circle"
      railColor="#e6f4ff"
      percent={60}
      strokeWidth={20}
      size={14}
      format={(number) => `In progress, ${number}% complete`}
    />
    <span>Code release</span>
  </Flex>
);

export default App;
