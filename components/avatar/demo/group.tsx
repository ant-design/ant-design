import React from 'react';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Tooltip } from 'antd';

const App: React.FC = () => (
  <>
    <Avatar.Group>
      <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
      <a href="https://ant.design">
        <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
      </a>
      <Tooltip title="Ant User" placement="top">
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      </Tooltip>
      <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
    </Avatar.Group>
    <Divider />
    <Avatar.Group
      max={{
        count: 2,
        style: { color: '#f56a00', backgroundColor: '#fde3cf' },
      }}
    >
      <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
      <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
      <Tooltip title="Ant User" placement="top">
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      </Tooltip>
      <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
    </Avatar.Group>
    <Divider />
    <Avatar.Group
      size="large"
      max={{
        count: 2,
        style: { color: '#f56a00', backgroundColor: '#fde3cf' },
      }}
    >
      <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=3" />
      <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
      <Tooltip title="Ant User" placement="top">
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      </Tooltip>
      <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
    </Avatar.Group>
    <Divider />
    <Avatar.Group
      size="large"
      max={{
        count: 2,
        style: { color: '#f56a00', backgroundColor: '#fde3cf', cursor: 'pointer' },
        popover: { trigger: 'click' },
      }}
    >
      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
      <Tooltip title="Ant User" placement="top">
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      </Tooltip>
      <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
    </Avatar.Group>
    <Divider />
    <Avatar.Group shape="square">
      <Avatar style={{ backgroundColor: '#fde3cf' }}>A</Avatar>
      <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
      <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      <Avatar style={{ backgroundColor: '#1677ff' }} icon={<AntDesignOutlined />} />
    </Avatar.Group>
  </>
);

export default App;
