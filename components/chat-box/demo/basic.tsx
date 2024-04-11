import React from 'react';
import { ChatBox, Flex } from 'antd';

const App: React.FC = () => (
  <Flex gap="small" vertical>
    <ChatBox content="你好你好你好" placement="start" />
    <ChatBox content="你好你好你好" placement="end" />
  </Flex>
);

export default App;
