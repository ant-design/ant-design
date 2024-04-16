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

const hideAvatar: React.CSSProperties = {
  visibility: 'hidden',
};

const App: React.FC = () => (
  <Flex gap="middle" vertical>
    <Chatbox
      placement="start"
      content="Good morning, how are you ?"
      avatar={<Avatar size={32} icon={<UserOutlined />} style={fooAvatar} />}
    />
    <Chatbox
      placement="start"
      content="What a beautiful day !"
      styles={{ avatar: hideAvatar }}
      avatar={<Avatar size={32} />}
    />
    <Chatbox
      placement="end"
      content="Hi, good morning, I'm fine !"
      avatar={<Avatar size={32} icon={<UserOutlined />} style={barAvatar} />}
    />
    <Chatbox
      placement="end"
      content="Thank you !"
      styles={{ avatar: hideAvatar }}
      avatar={<Avatar size={32} />}
    />
  </Flex>
);

export default App;
