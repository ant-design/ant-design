import React from 'react';
import { AutoComplete, Flex, Input, Select } from 'antd';

const App: React.FC = () => (
  <Flex gap={12} wrap>
    <Input disabled placeholder="Regular Input" />
    <AutoComplete disabled>
      <Input.TextArea disabled />
    </AutoComplete>
    <Select disabled options={[]} />
  </Flex>
);

export default App;
