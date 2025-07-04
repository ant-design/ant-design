import React from 'react';
import { Flex, Progress } from 'antd';

const App: React.FC = () => (
  <Flex align="center" gap="small">
    <Progress
      type="circle"
      trailColor="#e6f4ff"
      percent={60}
      strokeWidth={20}
      size={14}
      format={(number) => `进行中，已完成${number}%`}
    />
    <span>代码发布</span>
  </Flex>
);

export default App;
