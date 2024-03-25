import React from 'react';
import { Input, Space } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical">
    <Input.OTP size="small" />
    <Input.OTP />
    <Input.OTP size="large" />
  </Space>
);

export default App;
