import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, ChatBox, Flex } from 'antd';

const App: React.FC = () => (
  <Flex gap="middle" vertical>
    <ChatBox
      content="晚上好，你吃过了吗？"
      placement="start"
      avatar={<Avatar size={32} icon={<UserOutlined style={{ backgroundColor: '#fde3cf' }} />} />}
    />
    <ChatBox
      content="晚上好，你吃过了吗？"
      placement="end"
      avatar={<Avatar size={32} icon={<UserOutlined style={{ backgroundColor: '#87d068' }} />} />}
    />
  </Flex>
);

export default App;
