import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import React from 'react';

const items: MenuProps['items'] = [
  {
    key: 'settings',
    label: 'Settings',
    icon: <SettingOutlined />,
    children: [
      { key: 'profile', label: 'Profile' },
      { key: 'account', label: 'Account' },
      { key: 'privacy', label: 'Privacy' },
    ],
  },
  {
    key: 'mail',
    label: 'Mail',
    icon: <MailOutlined />,
    children: [
      { key: 'sent', label: 'Sent' },
      { key: 'inbox', label: 'Inbox' },
      { key: 'drafts', label: 'Drafts' },
    ],
  },
  {
    key: 'apps',
    label: 'Applications',
    icon: <AppstoreOutlined />,
  },
];

const App: React.FC = () => (
  <Menu
    mode="inline"
    sorted
    defaultOpenKeys={['mail', 'settings']}
    style={{ width: 256 }}
    items={items}
  />
);

export default App;
