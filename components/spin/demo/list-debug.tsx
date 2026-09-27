import React from 'react';
import { Flex, Listy, Spin } from 'antd';

const App: React.FC = () => (
  <Listy<string>
    items={['Apple', 'Banana']}
    rowKey={(item) => item}
    itemRender={(item) => (
      <Flex justify="space-between" align="center">
        {item}
        <Spin size="small" />
      </Flex>
    )}
  />
);

export default App;
