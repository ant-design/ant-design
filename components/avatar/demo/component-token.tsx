import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, ConfigProvider, Space, Tooltip } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Avatar: {
          avatarSizeBase: 60,
          avatarSizeLG: 30,
          avatarSizeSM: 16,

          avatarFontSizeBase: 18,
          avatarFontSizeLG: 28,
          avatarFontSizeSM: 12,

          avatarBorderRadius: 10,
          avatarBg: '#fde3cf',
          avatarColor: '#a3323d',
          groupSpace: -10,
          groupBorderColor: '#eee',
        },
      },
    }}
  >
    <Space>
      <Avatar shape="circle" src="http://abc.com/not-exist.jpg">
        A
      </Avatar>
      <Avatar shape="circle" src="http://abc.com/not-exist.jpg">
        ABC
      </Avatar>
    </Space>
    <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
      <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
      <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
      <Tooltip title="Ant User" placement="top">
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      </Tooltip>
      <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AntDesignOutlined />} />
    </Avatar.Group>
  </ConfigProvider>
);

export default App;
