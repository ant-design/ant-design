import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

export default () => (
  <>
    <div>
      <Avatar size={64} icon={<UserOutlined />} /> <Avatar size="large" icon={<UserOutlined />} />{' '}
      <Avatar icon={<UserOutlined />} /> <Avatar size="small" icon={<UserOutlined />} />{' '}
    </div>{' '}
    <div>
      {' '}
      <Avatar shape="square" size={64} icon={<UserOutlined />} />{' '}
      <Avatar shape="square" size="large" icon={<UserOutlined />} />{' '}
      <Avatar shape="square" icon={<UserOutlined />} />{' '}
      <Avatar shape="square" size="small" icon={<UserOutlined />} />{' '}
    </div>{' '}
  </>
);
