import React from 'react';
import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Divider, Tooltip } from 'antd';

const App: React.FC = () => (
  <>
    <Avatar.Group>
      <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" alt="group avatar" />
      <a href="https://ant.design">
        <Avatar style={{ backgroundColor: '#f56a00' }} alt="group avatar">
          K
        </Avatar>
      </a>
      <Tooltip title="Ant User" placement="top">
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} alt="group avatar" />
      </Tooltip>
      <Avatar
        style={{ backgroundColor: '#1677ff' }}
        icon={<AntDesignOutlined />}
        alt="group avatar"
      />
    </Avatar.Group>
    <Divider />
    <Avatar.Group
      max={{
        count: 2,
        style: { color: '#f56a00', backgroundColor: '#fde3cf' },
      }}
    >
      <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" alt="group avatar" />
      <Avatar style={{ backgroundColor: '#f56a00' }} alt="group avatar">
        K
      </Avatar>
      <Tooltip title="Ant User" placement="top">
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} alt="group avatar" />
      </Tooltip>
      <Avatar
        style={{ backgroundColor: '#1677ff' }}
        icon={<AntDesignOutlined />}
        alt="group avatar"
      />
    </Avatar.Group>
    <Divider />
    <Avatar.Group
      size="large"
      max={{
        count: 2,
        style: { color: '#f56a00', backgroundColor: '#fde3cf' },
      }}
    >
      <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=3" alt="group avatar" />
      <Avatar style={{ backgroundColor: '#f56a00' }} alt="group avatar">
        K
      </Avatar>
      <Tooltip title="Ant User" placement="top">
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} alt="group avatar" />
      </Tooltip>
      <Avatar
        style={{ backgroundColor: '#1677ff' }}
        icon={<AntDesignOutlined />}
        alt="group avatar"
      />
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
      <Avatar
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="group avatar"
      />
      <Avatar style={{ backgroundColor: '#f56a00' }} alt="group avatar">
        K
      </Avatar>
      <Tooltip title="Ant User" placement="top">
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} alt="group avatar" />
      </Tooltip>
      <Avatar
        style={{ backgroundColor: '#1677ff' }}
        icon={<AntDesignOutlined />}
        alt="group avatar"
      />
    </Avatar.Group>
    <Divider />
    <Avatar.Group shape="square">
      <Avatar style={{ backgroundColor: '#fde3cf' }} alt="group avatar">
        A
      </Avatar>
      <Avatar style={{ backgroundColor: '#f56a00' }} alt="group avatar">
        K
      </Avatar>
      <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} alt="group avatar" />
      <Avatar
        style={{ backgroundColor: '#1677ff' }}
        icon={<AntDesignOutlined />}
        alt="group avatar"
      />
    </Avatar.Group>
  </>
);

export default App;
