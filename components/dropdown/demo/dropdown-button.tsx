import React from 'react';
import { DownOutlined, EllipsisOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';

const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  message.info('Click on left button.');
  console.log('click left button', e);
};

const handleMenuClick: MenuProps['onClick'] = (e) => {
  message.info('Click on menu item.');
  console.log('click', e);
};

const items: MenuProps['items'] = [
  {
    label: '1st menu item',
    key: '1',
    icon: <UserOutlined />,
  },
  {
    label: '2nd menu item',
    key: '2',
    icon: <UserOutlined />,
  },
  {
    label: '3rd menu item',
    key: '3',
    icon: <UserOutlined />,
    danger: true,
  },
  {
    label: '4rd menu item',
    key: '4',
    icon: <UserOutlined />,
    danger: true,
    disabled: true,
  },
];

const menuProps = {
  items,
  onClick: handleMenuClick,
};

const App: React.FC = () => (
  <Space wrap>
    <Space.Compact>
      <Button onClick={handleButtonClick}>Dropdown</Button>
      <Dropdown menu={menuProps} placement="bottomRight">
        <Button icon={<EllipsisOutlined />} />
      </Dropdown>
    </Space.Compact>
    <Space.Compact>
      <Button onClick={handleButtonClick}>Dropdown</Button>
      <Dropdown menu={menuProps} placement="bottomRight">
        <Button icon={<UserOutlined />} />
      </Dropdown>
    </Space.Compact>
    <Space.Compact>
      <Button onClick={handleButtonClick} disabled>
        Dropdown
      </Button>
      <Dropdown menu={menuProps} placement="bottomRight" disabled>
        <Button icon={<EllipsisOutlined />} disabled />
      </Dropdown>
    </Space.Compact>
    <Space.Compact>
      <Tooltip title="tooltip">
        <Button onClick={handleButtonClick}>With Tooltip</Button>
      </Tooltip>
      <Dropdown menu={menuProps} placement="bottomRight">
        <Button loading />
      </Dropdown>
    </Space.Compact>
    <Dropdown menu={menuProps}>
      <Button onClick={handleButtonClick} icon={<DownOutlined />} iconPlacement="end">
        Button
      </Button>
    </Dropdown>
    <Space.Compact>
      <Button onClick={handleButtonClick} danger>
        Danger
      </Button>
      <Dropdown menu={menuProps} placement="bottomRight">
        <Button icon={<EllipsisOutlined />} danger />
      </Dropdown>
    </Space.Compact>
  </Space>
);

export default App;
