import React from 'react';
import { DownOutlined, LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Dropdown, Flex, Space } from 'antd';
import type { DropdownProps, MenuProps } from 'antd';
import { createStyles } from 'antd-style';

const useStyles = createStyles(({ token }) => ({
  root: {
    backgroundColor: token.colorFillAlter,
    border: `1px solid ${token.colorBorder}`,
    borderRadius: token.borderRadius,
  },
}));

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Profile',
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

const objectStyles: DropdownProps['styles'] = {
  root: {
    backgroundColor: '#ffffff',
    border: '1px solid #d9d9d9',
    borderRadius: '4px',
  },
  item: {
    padding: '8px 12px',
    fontSize: '14px',
  },
  itemTitle: {
    fontWeight: '500',
  },
  itemIcon: {
    color: '#1890ff',
    marginRight: '8px',
  },
  itemContent: {
    backgroundColor: 'transparent',
  },
};

const functionStyles: DropdownProps['styles'] = (info) => {
  const { props } = info;
  const isClick = props.trigger?.includes('click');
  if (isClick) {
    return {
      root: {
        borderColor: '#1890ff',
        borderRadius: '8px',
      },
    };
  }
  return {};
};

const App: React.FC = () => {
  const { styles } = useStyles();

  const sharedProps: DropdownProps = {
    menu: { items },
    placement: 'bottomLeft' as const,
    classNames: {
      root: styles.root,
    },
  };
  return (
    <Flex gap="middle" wrap="wrap">
      <Space vertical size="large">
        <Dropdown {...sharedProps} styles={objectStyles}>
          <Button>
            <Space>
              Object Style
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>

        <Dropdown {...sharedProps} styles={functionStyles} trigger={['click']}>
          <Button type="primary">
            <Space>
              Function Style
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </Space>
    </Flex>
  );
};

export default App;
