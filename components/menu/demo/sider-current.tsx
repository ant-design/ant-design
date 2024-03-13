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
    getItem('Submenu', '23', null, [getItem('Option 1', '231'), getItem('Option 2', '232')]),
    getItem('Submenu 2', '24', null, [getItem('Option 1', '241'), getItem('Option 2', '242')]),
  ]),
  getItem('Navigation Three', '3', <SettingOutlined />, [
    getItem('Option 1', '31'),
    getItem('Option 2', '32'),
    getItem('Option 3', '33'),
    getItem('Option 4', '34'),
  ]),
];

const App: React.FC = () => {
  const [openKeys, setOpenKeys] = useState(['2', '23']);
  const [selectedKeys, setSelectedKeys] = useState(['231']);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const countData: Record<number, number> = {};
    let repeatIndex: number[] = [];
    keys.forEach((item, index) => {
      if (countData[item.length] !== undefined) {
        repeatIndex = [countData[item.length], index];
      }
      countData[item.length] = index;
    });
    if (repeatIndex.length) {
      const [oldIndex, newIndex] = repeatIndex;
      setOpenKeys(
        keys
          .map((item, index) => (index === oldIndex ? keys[newIndex] : item))
          .filter((_, index) => index !== newIndex),
      );
    } else {
      setOpenKeys(openKeys);
    }
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      selectedKeys={selectedKeys}
      onOpenChange={onOpenChange}
      onSelect={(info) => setSelectedKeys([info.key])}
      style={{ width: 256 }}
      items={items}
    />
  );
};

export default App;
