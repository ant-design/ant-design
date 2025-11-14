import React from 'react';
import type { InputNumberProps } from 'antd';
import { Flex, InputNumber } from 'antd';

const onChange: InputNumberProps['onChange'] = (value) => {
  console.log('changed', value);
};

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <InputNumber mode="spinner" min={1} max={10} defaultValue={3} onChange={onChange} />
  </Flex>
);

export default App;
