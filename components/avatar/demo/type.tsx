import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';

const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';

const App: React.FC = () => (
  <Space size={16} wrap>
    <Avatar icon={<UserOutlined />} alt="User avatar" />
    <Avatar alt="User avatar">U</Avatar>
    <Avatar size={40} alt="User avatar">
      USER
    </Avatar>
    <Avatar src={url} alt="User avatar" />
    <Avatar src={<img src={url} alt="avatar" />} alt="User avatar" />
    <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }} alt="User avatar">
      U
    </Avatar>
    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} alt="User avatar" />
  </Space>
);

export default App;
