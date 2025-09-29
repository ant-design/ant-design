import React from 'react';
import { Button, ConfigProvider, Flex, Tooltip } from 'antd';

const SharedButton = ({ placement = 'top' }: { placement?: 'top' | 'bottom' }) => (
  <Tooltip title="Hello, Ant Design!" placement={placement}>
    <Button type="primary">Button</Button>
  </Tooltip>
);

const App: React.FC = () => {
  return (
    <ConfigProvider
      tooltip={{
        unique: true,
      }}
    >
      <Flex vertical gap="small">
        <Flex gap="small" justify="center">
          <SharedButton />
          <SharedButton />
        </Flex>
        <Flex gap="small" justify="center">
          <SharedButton placement="bottom" />
          <SharedButton placement="bottom" />
        </Flex>
      </Flex>
    </ConfigProvider>
  );
};

export default App;
