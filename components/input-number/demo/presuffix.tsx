import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Flex, InputNumber, Space } from 'antd';

const App: React.FC = () => (
  <Flex vertical gap="middle">
    <InputNumber prefix="￥" style={{ width: '100%' }} />

    <Space.Compact block>
      <Space.Addon>
        <UserOutlined />
      </Space.Addon>
      <InputNumber prefix="￥" style={{ width: '100%' }} />
    </Space.Compact>

    <InputNumber prefix="￥" disabled style={{ width: '100%' }} />

    <InputNumber suffix="RMB" style={{ width: '100%' }} />
  </Flex>
);

export default App;
