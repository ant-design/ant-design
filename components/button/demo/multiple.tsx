import React from 'react';
import { Button, Flex } from 'antd';

const App: React.FC = () => (
  <Flex align="flex-start" gap="small" vertical>
    <Button type="primary">primary</Button>
    <Button>secondary</Button>
  </Flex>
);

export default App;
