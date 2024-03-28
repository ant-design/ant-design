import React from 'react';
import { Flex, Progress } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" vertical>
    <Progress percent={0} infoPosition="inside" size={[300, 20]} />
    <Progress percent={10} infoPosition="inside" size={[300, 20]} />
    <Progress percent={50} infoPosition="inside" infoInsidePosition="left" size={[300, 20]} />
    <Progress percent={60} infoPosition="inside" size={[300, 20]} />
    <Progress percent={100} infoPosition="inside" infoInsidePosition="center" size={[300, 20]} />
    <Progress percent={60} infoPosition="bottom" size="small" />
    <Progress percent={100} infoPosition="bottom" infoInsidePosition="center" />
  </Flex>
);

export default App;
