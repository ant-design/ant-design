import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { InputNumber, Space } from 'antd';

const App: React.FC = () => (
  <>
    <InputNumber prefix="￥" style={{ width: '100%' }} />
    <br />
    <br />
    <Space.Compact>
      <Space.Addon>
        <UserOutlined />
      </Space.Addon>
      <InputNumber prefix="￥" style={{ width: '100%' }} />
    </Space.Compact>

    <br />
    <br />
    <InputNumber prefix="￥" disabled style={{ width: '100%' }} />
    <br />
    <br />
    <InputNumber suffix="RMB" style={{ width: '100%' }} />
  </>
);

export default App;
