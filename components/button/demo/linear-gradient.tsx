import React from 'react';
import { Button, ConfigProvider, Space } from 'antd';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Button: {
          colorPrimary: 'linear-gradient(90deg, #FF4E50, #F9D423) !important',
          primaryShadow: 'none',
          defaultBg: 'linear-gradient(90deg, #aea4e3, #d3ffe8) !important',
          defaultShadow: 'none',
          defaultColor: '#fff !important',
          lineWidth: 0,
        },
      },
    }}
  >
    <Space>
      <Button type="primary">Primary Button</Button>
      <Button>Default Button</Button>
    </Space>
  </ConfigProvider>
);

export default App;
