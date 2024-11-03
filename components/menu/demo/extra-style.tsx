import React from 'react';
import { DownOutlined, MailOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Flex, Menu } from 'antd';

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
    ],
  },
];

const items2: MenuItem[] = [
  { key: '1', label: 'Users', extra: '⌘U' },
  { key: '2', label: 'Profile', extra: '⌘P' },
];

const App: React.FC = () => (
  <>
    <Menu
      mode="inline"
      defaultOpenKeys={['sub1']}
      defaultSelectedKeys={['1']}
      style={{ width: 256 }}
      items={items1}
    />
    <Menu style={{ width: 256 }} items={items2} />
  </>
);

export default App;
