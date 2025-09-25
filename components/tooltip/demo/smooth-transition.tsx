import React from 'react';
import { Button, ConfigProvider, Flex, Space, Tooltip } from 'antd';

const SharedButton = ({ placement = 'top' }: { placement?: 'top' | 'bottom' }) => (
  <Tooltip title="Hello, Ant Design!" placement={placement}>
    <Button type="primary">Button</Button>
  </Tooltip>
);

const App: React.FC = () => {
  return (
    <div style={{ margin: 100 }}>
      <ConfigProvider
        tooltip={{
          unique: true,
        }}
      >
        <Flex vertical gap="small">
          <Space>
            <SharedButton />
            <SharedButton />
          </Space>
          <Space>
            <SharedButton placement="bottom" />
            <SharedButton placement="bottom" />
          </Space>
        </Flex>
      </ConfigProvider>
    </div>
  );
};

export default App;
