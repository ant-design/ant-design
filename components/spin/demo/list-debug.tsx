import React from 'react';
import { Flex, Spin } from 'antd';

const App: React.FC = () => (
  <Spin spinning={false}>
    <Flex vertical gap="small">
      {['Apple', 'Banana'].map((item) => (
        <Flex key={item} justify="space-between" align="center">
          {item}
          <Spin size="small" />
        </Flex>
      ))}
    </Flex>
  </Spin>
);

export default App;
