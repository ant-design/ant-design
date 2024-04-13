import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, ChatBox, Flex } from 'antd';

const App: React.FC = () => {
  const [, forceRender] = React.useReducer((x) => x + 1, 0);
  return (
    <Flex align="start" gap="large" vertical>
      <ChatBox
        step
        key={Date.now()}
        content="晚上好，你吃过了吗？"
        avatar={<Avatar size={32} icon={<UserOutlined />} />}
      />
      <Button type="primary" onClick={forceRender}>
        force Render
      </Button>
    </Flex>
  );
};

export default App;
