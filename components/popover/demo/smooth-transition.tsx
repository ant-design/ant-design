import React from 'react';
import { Button, ConfigProvider, Flex, Popover } from 'antd';

const SharedPopover = ({ placement = 'top' }: { placement?: 'top' | 'bottom' }) => (
  <Popover content="Hello, Ant Design!" title="Title" placement={placement}>
    <Button type="primary">Button</Button>
  </Popover>
);

const App: React.FC = () => {
  return (
    <ConfigProvider
      popover={{
        unique: true,
      }}
    >
      <Flex vertical gap="small">
        <Flex gap="small" justify="center">
          <SharedPopover />
          <SharedPopover />
        </Flex>
        <Flex gap="small" justify="center">
          <SharedPopover placement="bottom" />
          <SharedPopover placement="bottom" />
        </Flex>
      </Flex>
    </ConfigProvider>
  );
};

export default App;
