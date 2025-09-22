import React from 'react';
import { DownOutlined, LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import type { DropdownProps, MenuProps } from 'antd';
import { Button, Dropdown, Flex, Space } from 'antd';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Profile',
    type: 'group',
    children: [
      {
        key: '1-1',
        label: 'Profile',
        icon: <UserOutlined />,
      },
    ],
  },
  {
    key: '2',
    label: 'Settings',
    icon: <SettingOutlined />,
  },
  {
    type: 'divider',
  },
  {
    key: '3',
    label: 'Logout',
    icon: <LogoutOutlined />,
    danger: true,
  },
];

// Object-based classNames
const objectClassNames: DropdownProps['classNames'] = {
  root: 'demo-dropdown-root',
  item: 'demo-dropdown-item',
  itemTitle: 'demo-dropdown-item-title',
  itemIcon: 'demo-dropdown-item-icon',
  itemContent: 'demo-dropdown-item-content',
};

// Function-based classNames
const functionClassNames: DropdownProps['classNames'] = (info) => {
  const { props } = info;
  return {
    root: props.trigger?.includes('hover') ? 'demo-dropdown-hover' : 'demo-dropdown-click',
    item: 'demo-dropdown-item-dynamic',
    itemTitle: 'demo-dropdown-title-dynamic',
    itemIcon: 'demo-dropdown-icon-dynamic',
    itemContent: 'demo-dropdown-content-dynamic',
  };
};

// Object-based styles
const objectStyles: DropdownProps['styles'] = {
  root: {
    backgroundColor: '#f0f8ff',
    border: '1px solid #1890ff',
  },
  item: {
    padding: '8px 16px',
    fontSize: '14px',
  },
  itemTitle: {
    fontWeight: 'bold',
    color: 'red',
  },
  itemIcon: {
    color: '#52c41a',
    marginRight: '8px',
  },
  itemContent: {
    backgroundColor: '#f6ffed',
  },
};

// Function-based styles
const functionStyles: DropdownProps['styles'] = (info) => {
  const { props } = info;
  const isHover = props.trigger?.includes('hover');

  return {
    root: {
      backgroundColor: isHover ? '#fff2e8' : '#e6f7ff',
      border: `2px solid ${isHover ? '#fa8c16' : '#1890ff'}`,
      borderRadius: '6px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
    item: {
      padding: '10px 16px',
      transition: 'all 0.3s',
    },
    itemTitle: {
      color: isHover ? '#fa8c16' : '#1890ff',
      fontWeight: '600',
    },
    itemIcon: {
      color: isHover ? '#fa541c' : '#52c41a',
    },
    itemContent: {
      backgroundColor: isHover ? '#fff7e6' : '#f0f8ff',
      borderRadius: '4px',
    },
  };
};

const App: React.FC = () => (
  <Flex gap="middle" wrap="wrap">
    <Space direction="vertical" size="large">
      <Dropdown
        menu={{ items }}
        classNames={objectClassNames}
        styles={objectStyles}
        placement="bottomLeft"
      >
        <Button>
          <Space>
            Object Style
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>

      <Dropdown
        menu={{ items }}
        classNames={functionClassNames}
        styles={functionStyles}
        trigger={['click']}
        placement="bottomLeft"
      >
        <Button type="primary">
          <Space>
            Function Style (Click)
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </Space>
  </Flex>
);

export default App;
