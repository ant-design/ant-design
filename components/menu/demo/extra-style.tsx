import React from 'react';
import { DownOutlined, MailOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Flex, Menu, Space } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items1: MenuItem[] = [
  {
    key: 'sub1',
    icon: <MailOutlined />,
    label: 'Navigation One',
    children: [
      {
        key: '1',
        label: (
          <Flex justify="space-between">
            <span>Option 1</span>
            <DownOutlined />
          </Flex>
        ),
      },
      {
        key: '2',
        label: 'Option 2',
        extra: '⌘P',
      },
      {
        key: '3',
        label: <a href="https://www.baidu.com">Link Option</a>,
        disabled: true,
      },
    ],
  },
];

const items2: MenuItem[] = [
  { key: '1', label: 'Users', extra: '⌘U' },
  { key: '2', label: 'Profile', extra: '⌘P' },
];

const App: React.FC = () => (
  <Space direction="vertical">
    <Menu
      mode="inline"
      defaultOpenKeys={['sub1']}
      defaultSelectedKeys={['1']}
      style={{ width: 256 }}
      items={items1}
    />
    <Menu theme="dark" style={{ width: 256 }} items={items2} />
  </Space>
);

export default App;
