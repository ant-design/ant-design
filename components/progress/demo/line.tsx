import React from 'react';
// import { RocketFilled } from '@ant-design/icons';
import { Flex, Progress } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" vertical>
    <Progress percent={60} />
    <Progress percent={100} status="active" />
    <Progress percent={0} status="exception" />
    <Progress percent={100} />
    <Progress percent={50} showInfo={false} />
  </Flex>
);
export default App;
