import React from 'react';
import { Flex, Progress } from 'antd';

const App: React.FC = () => (
  <Flex gap="middle" vertical>
    <Progress
      percent={[
        { value: 40, status: 'success' },
        { value: 30, status: 'active' },
        { value: 20, status: 'exception' },
      ]}
    />
    <Progress
      percent={[
        { value: 30, status: 'success' },
        { value: 50, status: 'active' },
        { value: 20, status: 'normal' },
      ]}
    />
    <Progress
      percent={[
        { value: 25, status: 'success', strokeColor: '#52c41a' },
        { value: 35, status: 'active', strokeColor: '#1890ff' },
        { value: 15, status: 'exception', strokeColor: '#ff4d4f' },
        { value: 10, status: 'normal', strokeColor: '#d9d9d9' },
      ]}
    />
  </Flex>
);

export default App;
