import React from 'react';
import { Flex, Progress } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="small" style={{ width: 180 }}>
    <Progress percent={30} size="small" />
    <Progress percent={50} size="small" status="active" />
    <Progress percent={70} size="small" status="exception" />
    <Progress percent={100} size="small" />
  </Flex>
);

export default App;
