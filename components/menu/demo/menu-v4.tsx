import {
  AppstoreOutlined,
  CalendarOutlined,
  LinkOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import { ConfigProvider, Menu, Switch, Typography } from 'antd';
import type { MenuProps } from 'antd/es/menu';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Navigation One', '1', <MailOutlined />),
  getItem('Navigation Two', '2', <CalendarOutlined />),
  getItem('Navigation Two', 'sub1', <AppstoreOutlined />, [
    getItem(
      <Typography.Text ellipsis>
        Ant Design, a design language for background applications, is refined by Ant UED Team
      </Typography.Text>,
      '3',
    ),
    getItem('Option 4', '4'),
    getItem('Submenu', 'sub1-2', null, [getItem('Option 5', '5'), getItem('Option 6', '6')]),
  ]),
  getItem('Navigation Three', 'sub2', <SettingOutlined />, [
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
  ]),
  getItem(
    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
      Ant Design
    </a>,
    'link',
    <LinkOutlined />,
  ),
];

const App: React.FC = () => {
  const [mode, setMode] = useState<'vertical' | 'inline'>('inline');

  const changeMode = (value: boolean) => {
    setMode(value ? 'vertical' : 'inline');
  };

  return (
    <>
      <Switch onChange={changeMode} /> Change Mode
      <br />
      <br />
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBorderRadius: 0,
              subMenuItemBorderRadius: 0,
              itemHoverColor: '#1890ff',
              itemSelectedColor: '#1890ff',
              itemSelectedBg: '#e6f7ff',
              activeBarWidth: 3,
              itemMarginInline: 0,
              itemHoverBg: 'transparent',
            },
          },
        }}
      >
        <Menu
          style={{ width: 256 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode={mode}
          items={items}
        />
      </ConfigProvider>
    </>
  );
};

export default App;
