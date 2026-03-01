import React from 'react';
import { Flex, Rate } from 'antd';

const App: React.FC = () => (
  <Flex gap="medium" vertical>
    <Flex gap="medium">
      <Rate defaultValue={3} />
      <span>allowClear: true</span>
    </Flex>
    <Flex gap="medium">
      <Rate defaultValue={3} allowClear={false} />
      <span>allowClear: false</span>
    </Flex>
  </Flex>
);

export default App;
