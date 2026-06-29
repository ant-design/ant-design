import React from 'react';
import { Flex, Input, InputNumber, Select } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap={16}>
    <Flex gap={8} align="center">
      <InputNumber
        style={{ width: 100, background: 'lightpink' }}
        variant="borderless"
        size="large"
      />
      <Input style={{ width: 100, background: 'lightpink' }} variant="borderless" size="large" />
      <Select style={{ width: 100, background: 'lightpink' }} variant="borderless" size="large" />
    </Flex>
    <Flex gap={8} align="center">
      <InputNumber style={{ width: 100, background: 'lightpink' }} variant="borderless" />
      <Input style={{ width: 100, background: 'lightpink' }} variant="borderless" />
      <Select style={{ width: 100, background: 'lightpink' }} variant="borderless" />
    </Flex>
    <Flex gap={8} align="center">
      <InputNumber
        style={{ width: 100, background: 'lightpink' }}
        variant="borderless"
        size="small"
      />
      <Input style={{ width: 100, background: 'lightpink' }} variant="borderless" size="small" />
      <Select style={{ width: 100, background: 'lightpink' }} variant="borderless" size="small" />
    </Flex>
  </Flex>
);

export default App;
