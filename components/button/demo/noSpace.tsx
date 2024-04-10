import React from 'react';
import { Button, ConfigProvider, Flex } from 'antd';

const App: React.FC = () => (
  <Flex gap="middle" wrap="wrap">
    <Button type="primary" autoInsertSpace={false}>
      确定
    </Button>
    <ConfigProvider button={{ autoInsertSpace: false }}>
      <Button>确定</Button>
    </ConfigProvider>
  </Flex>
);

export default App;
