import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps, MenuTheme } from 'antd';
import { Menu, Switch } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      { key: '1', label: 'Option 1' },
      { key: '2', label: 'Option 2' },
      { key: '3', label: 'Option 3' },
      { key: '4', label: 'Option 4' },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '7', label: 'Option 7' },
          { key: '8', label: 'Option 8' },
        ],
      },
    ],
  },
  {
    key: 'sub4',
    label: 'Navigation Three',
    icon: <SettingOutlined />,
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      { key: '11', label: 'Option 11' },
      { key: '12', label: 'Option 12' },
    ],
  },
];

const App: React.FC = () => {
  const [theme, setTheme] = useState<MenuTheme>('dark');
  const [current, setCurrent] = useState('1');

  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <>
      <Switch
        checked={theme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
      <br />
      <br />
      <Menu
        theme={theme}
        onClick={onClick}
        style={{ width: 256 }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />
    </>
  );
};

export default App;
