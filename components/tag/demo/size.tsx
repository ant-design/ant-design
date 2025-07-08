import React from 'react';
import { Flex, Tag } from 'antd';

const App: React.FC = () => (
  <Flex align="flex-end" gap="4px 0" wrap>
    <Tag>Default</Tag>
    <Tag size="small">Small</Tag>
    <Tag size="middle">Medium</Tag>
    <Tag size="large">Large</Tag>
  </Flex>
);

export default App;
