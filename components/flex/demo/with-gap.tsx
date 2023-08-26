import React from 'react';
import { Flex } from 'antd';

const App: React.FC = () => (
  <>
    <Flex gap="small" flex="0 1 auto">
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Flex>
    <Flex gap={30} flex="0 1 auto">
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Flex>
  </>
);

export default App;
