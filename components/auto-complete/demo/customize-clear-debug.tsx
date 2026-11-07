import React from 'react';
import { AutoComplete, Flex, Input } from 'antd';

const options = [{ value: 'Burnaby' }, { value: 'Seattle' }, { value: 'Los Angeles' }];

const App: React.FC = () => (
  <Flex vertical gap={24} style={{ width: 300 }}>
    <AutoComplete allowClear defaultValue="Burnaby" options={options}>
      <Input />
    </AutoComplete>
    <AutoComplete allowClear defaultValue="Burnaby" options={options}>
      <Input.TextArea />
    </AutoComplete>
  </Flex>
);

export default App;
