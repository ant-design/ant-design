import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { ConfigProvider, Input, Space } from 'antd';

const App: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
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
    <ConfigProvider
      theme={{
        components: {
          Input: { colorBorderDisabled: '#d9d9d9', colorBgContainerDisabled: '#f5f5f5' },
        },
      }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Input placeholder="Disabled outlined" disabled />
        <Input placeholder="Disabled filled" disabled variant="filled" />
        <Input placeholder="Disabled underlined" disabled variant="underlined" />
      </Space>
    </ConfigProvider>
  </Space>
);

export default App;
