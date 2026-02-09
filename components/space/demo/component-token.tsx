import React from 'react';
import { ConfigProvider, Input, Space } from 'antd';

const App: React.FC = () => (
  <ConfigProvider theme={{ components: { Addon: { paddingInline: 24 } } }}>
    <Space.Compact>
      <Space.Addon>https://</Space.Addon>
      <Input placeholder="example.com" style={{ width: 200 }} />
      <Space.Addon>.com</Space.Addon>
    </Space.Compact>
  </ConfigProvider>
);

export default App;
