import React from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { Flex, InputNumber } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <InputNumber allowClear defaultValue={123} />
    <InputNumber allowClear={{ clearIcon: <CloseOutlined /> }} defaultValue={456} />
  </Flex>
);

export default App;
