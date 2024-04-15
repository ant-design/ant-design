import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Chatbox, Flex } from 'antd';

const fooAvatar: React.CSSProperties = {
  color: '#f56a00',
  backgroundColor: '#fde3cf',
};

const barAvatar: React.CSSProperties = {
  color: '#fff',
  backgroundColor: '#87d068',
};

const App: React.FC = () => (
  <Flex gap="middle" vertical>
    <Chatbox
      content="晚上好，你吃过了吗？"
      placement="start"
      avatar={<Avatar size={32} icon={<UserOutlined />} style={fooAvatar} />}
    />
    <Chatbox
      content="晚上好，你吃过了吗？"
      placement="end"
      avatar={<Avatar size={32} icon={<UserOutlined />} style={barAvatar} />}
    />
  </Flex>
);

export default App;
