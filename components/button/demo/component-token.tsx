import React from 'react';
import { Button, ConfigProvider, Space } from 'antd';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Button: {
          algorithm: true,
          colorPrimary: '#1976d2',
          controlHeight: 36,
          primaryShadow:
            '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
          fontWeight: 500,
          defaultBorderColor: 'rgba(25, 118, 210, 0.5)',
          colorText: '#1976d2',
          defaultColor: '#1976d2',
          borderRadius: 4,
          colorTextDisabled: 'rgba(0, 0, 0, 0.26)',
          colorBgContainerDisabled: 'rgba(0, 0, 0, 0.12)',
        },
      },
    }}
  >
    <Space direction="vertical">
      <Space wrap>
        <Button type="text">TEXT</Button>
        <Button type="primary">CONTAINED</Button>
        <Button>OUTLINED</Button>
      </Space>
      <Space wrap>
        <Button type="text" disabled>
          TEXT
        </Button>
        <Button type="primary" disabled>
          CONTAINED
        </Button>
        <Button disabled>OUTLINED</Button>
      </Space>
    </Space>
  </ConfigProvider>
);

export default App;
