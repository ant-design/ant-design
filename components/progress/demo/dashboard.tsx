import React from 'react';
import { Flex, Progress } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" wrap>
    <Progress type="dashboard" percent={75} />
    <Progress type="dashboard" percent={75} gapDegree={30} />
  </Flex>
);

export default App;
