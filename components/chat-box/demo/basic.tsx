import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, ChatBox, Flex } from 'antd';

const App: React.FC = () => (
  <Flex gap="middle" vertical>
    <ChatBox
      placement="start"
      content="你好你好你好"
      avatar={<Avatar size={32} icon={<UserOutlined />} />}
    />
    <ChatBox
      placement="end"
      content="你好你好你好"
      avatar={<Avatar size={32} icon={<UserOutlined />} />}
    />
  </Flex>
);

export default App;
