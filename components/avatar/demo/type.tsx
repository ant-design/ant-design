import { UserOutlined } from '@ant-design/icons';
import React from 'react';
import { Avatar, Space } from 'antd';

const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';

const App: React.FC = () => (
  <Space size={16} wrap>
    <Avatar icon={<UserOutlined />} />
    <Avatar>U</Avatar>
    <Avatar size={40}>USER</Avatar>
    <Avatar src={url} />
    <Avatar src={<img src={url} alt="avatar" />} />
    <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>
    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
  </Space>
);

export default App;
