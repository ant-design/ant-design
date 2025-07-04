import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { ConfigProvider, Input } from 'antd';

const App: React.FC = () => (
  <>
    <ConfigProvider theme={{ token: { controlHeight: 28 } }}>
      <Input placeholder="Basic usage" />
    </ConfigProvider>
    <ConfigProvider
      componentSize="small"
      theme={{ token: {}, components: { Input: { inputFontSizeSM: 12 } } }}
    >
      <Input placeholder="Basic usage" />
    </ConfigProvider>
    <ConfigProvider theme={{ components: { Input: { inputFontSize: 10 } } }}>
      <Input placeholder="With prefix" prefix={<UserOutlined />} />
    </ConfigProvider>
  </>
);

export default App;
