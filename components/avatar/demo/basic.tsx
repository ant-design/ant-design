import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Avatar.Group size="default">
    <Avatar icon={<UserOutlined />} />
    <Avatar size="large" icon={<UserOutlined />} />
    <Avatar size="small" icon={<UserOutlined />} />
  </Avatar.Group>
);

export default App;
