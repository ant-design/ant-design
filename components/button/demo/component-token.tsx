import React from 'react';
import { Button, ConfigProvider, Flex } from 'antd';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Button: {
          algorithm: true,
          colorPrimary: '#1976d2',
          controlHeight: 36,
          primaryShadow:
            '0 3px 1px -2px rgba(0,0,0,0.2), 0 2px 2px 0 rgba(0,0,0,0.14), 0 1px 5px 0 rgba(0,0,0,0.12)',
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
    <Flex gap="small" vertical>
      <Flex wrap="wrap" gap="small">
        <Button type="text">TEXT</Button>
        <Button type="primary">CONTAINED</Button>
        <Button>OUTLINED</Button>
      </Flex>
      <Flex wrap="wrap" gap="small">
        <Button type="text" disabled>
          TEXT
        </Button>
        <Button type="primary" disabled>
          CONTAINED
        </Button>
        <Button disabled>OUTLINED</Button>
      </Flex>
    </Flex>
  </ConfigProvider>
);

export default App;
