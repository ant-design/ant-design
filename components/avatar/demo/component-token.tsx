import { AntDesignOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, ConfigProvider, Space, Tooltip } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Avatar: {
          containerSize: 60,
          containerSizeLG: 30,
          containerSizeSM: 16,

          textFontSize: 18,
          textFontSizeLG: 28,
          textFontSizeSM: 12,

          borderRadius: 10,
          groupOverlapping: -10,
          groupBorderColor: '#eee',
        },
      },
    }}
  >
    <Space>
      <Avatar shape="circle" src="http://abc.com/not-exist.jpg">
        A
      </Avatar>
    </Space>
    <Space>
      <Avatar.Group maxCount={2} maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
        <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
        <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
        <Tooltip title="Ant User" placement="top">
          <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
        </Tooltip>
        <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AntDesignOutlined />} />
      </Avatar.Group>
    </Space>
    <Space>
      <Badge count={1}>
        <Avatar shape="square" icon={<UserOutlined />} />
      </Badge>
      <Badge dot>
        <Avatar shape="square" icon={<UserOutlined />} />
      </Badge>
    </Space>
  </ConfigProvider>
);

export default App;
