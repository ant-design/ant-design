import React from 'react';
import { Flex, Progress } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" vertical>
    <Progress percent={0} percentPosition={['center', 'inner']} size={[200, 20]} />
    <Progress percent={10} percentPosition={['center', 'inner']} size={[300, 20]} />
    <Progress percent={50} percentPosition={['start', 'inner']} size={[300, 20]} />
    <Progress percent={60} percentPosition={['end', 'inner']} size={[300, 20]} />
    <Progress percent={100} percentPosition={['center', 'inner']} size={[400, 20]} />
    <Progress percent={60} percentPosition={['start', 'outer']} />
    <Progress percent={100} percentPosition={['start', 'outer']} />
    <Progress percent={60} percentPosition={['center', 'outer']} size="small" />
    <Progress percent={100} percentPosition={['center', 'outer']} />
  </Flex>
);

export default App;
