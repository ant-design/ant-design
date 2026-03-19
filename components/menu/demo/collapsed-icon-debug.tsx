import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { ConfigProvider, Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      {
        key: 'g1',
        label: 'Item 1',
        type: 'group',
        children: [
          { key: '1', label: 'Option 1' },
          { key: '2', label: 'Option 2' },
        ],
      },
      {
        key: 'g2',
        label: 'Item 2',
        type: 'group',
        children: [
          { key: '3', label: 'Option 3' },
          { key: '4', label: 'Option 4' },
        ],
      },
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
    type: 'divider',
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
  {
    key: 'grp',
    label: 'Group',
    type: 'group',
    children: [
      { key: '13', label: 'Option 13' },
      { key: '14', label: 'Option 14' },
    ],
  },
];

const App: React.FC = () => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            collapsedIconSize: 30,
          },
        },
      }}
    >
      <style>{`
        .menu-collapsed-icon-debug .ant-menu-item,
        .menu-collapsed-icon-debug .ant-menu-submenu-title {
          background: rgba(22, 119, 255, 0.06);
        }

        .menu-collapsed-icon-debug .ant-menu-item-icon {
          outline: 1px solid #ff4d4f;
          background: rgba(255, 77, 79, 0.12);
        }

        .menu-collapsed-icon-debug .ant-menu-item-icon svg,
        .menu-collapsed-icon-debug .ant-menu-submenu-title .anticon svg {
          outline: 1px solid #1677ff;
          background: rgba(22, 119, 255, 0.16);
        }

        .menu-collapsed-icon-debug .ant-menu-title-content {
          outline: 1px dashed #52c41a;
          background: rgba(82, 196, 26, 0.12);
        }
      `}</style>
      <div className="menu-collapsed-icon-debug">
        <Menu onClick={onClick} mode="inline" inlineCollapsed items={items} />
      </div>
    </ConfigProvider>
  );
};

export default App;
