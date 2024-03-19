/* eslint-disable @typescript-eslint/no-shadow */
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
const getLevelKeys = (items: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items: LevelKeysProps[], level = 1) => {
    items.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        return func(item.children, level + 1);
      }
    });
  };
  func(items);
  return key;
};
const levelKeys = getLevelKeys(items as LevelKeysProps[]);

const App: React.FC = () => {
  const [openKeys, setOpenKeys] = useState(['2', '23']);

  const onOpenChange = (openKeys: string[]) => {
    const countData: Record<number, number> = {};
    let repeatIndex: number[] = [];
    openKeys.forEach((key, index) => {
      const level = levelKeys[key];
      if (countData[level] !== undefined) {
        repeatIndex = [countData[level], index];
      }
      countData[level] = index;
    });
    if (repeatIndex.length) {
      const [oldIndex, newIndex] = repeatIndex;
      setOpenKeys(
        openKeys
          .map((item, index) => (index === oldIndex ? openKeys[newIndex] : item))
          .filter((_, index) => index !== newIndex),
      );
    } else {
      setOpenKeys(openKeys);
    }
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['231']}
      openKeys={openKeys}
      onOpenChange={(openKeys) => onOpenChange(openKeys as string[])}
      style={{ width: 256 }}
      items={items}
    />
  );
};

export default App;
