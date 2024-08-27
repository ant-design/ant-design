import React from 'react';
import { Button, Flex } from 'antd';

const App: React.FC = () => (
  <Flex gap="middle" wrap>
    <Button type="primary" autoInsertSpace={false}>
      确定
    </Button>
    <Button type="primary" autoInsertSpace>
      确定
    </Button>
  </Flex>
);

export default App;
