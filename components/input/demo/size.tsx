import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Flex, Input } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <Input size="large" placeholder="large size" prefix={<UserOutlined />} />
    <Input placeholder="default size" prefix={<UserOutlined />} />
    <Input size="small" placeholder="small size" prefix={<UserOutlined />} />
  </Flex>
);

export default App;
