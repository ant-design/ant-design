import React from 'react';
import { Button, ConfigProvider, Divider, Input, Space } from 'antd';

const App: React.FC = () => (
  <>
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: '#00b96b',
            algorithm: true, // 启用算法
          },
          Input: {
            colorPrimary: '#eb2f96',
            algorithm: true, // 启用算法
          },
        },
      }}
    >
      <Space>
        <div style={{ fontSize: 14 }}>开启算法：</div>
        <Input placeholder="Please Input" />
        <Button type="primary">Submit</Button>
      </Space>
    </ConfigProvider>
    <Divider />
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: '#00b96b',
          },
          Input: {
            colorPrimary: '#eb2f96',
          },
        },
      }}
    >
      <Space>
        <div style={{ fontSize: 14 }}>禁用算法：</div>
        <Input placeholder="Please Input" />
        <Button type="primary">Submit</Button>
      </Space>
    </ConfigProvider>
  </>
);

export default App;
