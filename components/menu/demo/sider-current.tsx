import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Navigation One', '1', <MailOutlined />, [
    getItem('Option 1', '11'),
    getItem('Option 2', '12'),
    getItem('Option 3', '13'),
    getItem('Option 4', '14'),
  ]),
  getItem('Navigation Two', '2', <AppstoreOutlined />, [
    getItem('Option 1', '21'),
    getItem('Option 2', '22'),
    getItem('Submenu', '23', null, [
      getItem('Option 1', '231'),
      getItem('Option 2', '232'),
      getItem('Option 3', '233'),
    ]),
    getItem('Submenu 2', '24', null, [
      getItem('Option 1', '241'),
      getItem('Option 2', '242'),
      getItem('Option 3', '243'),
    ]),
  ]),
  getItem('Navigation Three', '3', <SettingOutlined />, [
    getItem('Option 1', '31'),
    getItem('Option 2', '32'),
    getItem('Option 3', '33'),
    getItem('Option 4', '34'),
  ]),
];

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}
const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        return func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};
const levelKeys = getLevelKeys(items as LevelKeysProps[]);

const App: React.FC = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(['2', '23']);

  const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    console.log('openKeys', openKeys);
    const countData: Record<number, number> = {};
    let repeatIndex: number = -1;
    openKeys.forEach((key, index) => {
      const level = levelKeys[key];
      if (countData[level] !== undefined) {
        repeatIndex = countData[level];
      }
      countData[level] = index;
    });
    console.log('repeatIndex', repeatIndex);
    if (repeatIndex !== -1) {
      setStateOpenKeys(openKeys.filter((_, index) => index !== repeatIndex));
    } else {
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['231']}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      style={{ width: 256 }}
      items={items}
    />
  );
};

export default App;
