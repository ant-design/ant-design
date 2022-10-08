---
order: 5
title:
  zh-CN: 带下拉框的按钮
  en-US: Button with dropdown menu
---

## zh-CN

左边是按钮，右边是额外的相关功能菜单。可设置 `icon` 属性来修改右边的图标。

## en-US

A button is on the left, and a related functional menu is on the right. You can set the icon property to modify the icon of right.

```tsx
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, message, Space, Tooltip } from 'antd';
import React from 'react';

const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  message.info('Click on left button.');
  console.log('click left button', e);
};

const handleMenuClick: MenuProps['onClick'] = e => {
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
  },
];

const App: React.FC = () => (
  <Space wrap>
    <Dropdown.Button onClick={handleButtonClick} items={items} onMenuClick={handleMenuClick}>
      Dropdown
    </Dropdown.Button>
    <Dropdown.Button
      items={items}
      onMenuClick={handleMenuClick}
      placement="bottom"
      icon={<UserOutlined />}
    >
      Dropdown
    </Dropdown.Button>
    <Dropdown.Button
      onClick={handleButtonClick}
      items={items}
      onMenuClick={handleMenuClick}
      disabled
    >
      Dropdown
    </Dropdown.Button>
    <Dropdown.Button
      items={items}
      onMenuClick={handleMenuClick}
      buttonsRender={([leftButton, rightButton]) => [
        <Tooltip title="tooltip" key="leftButton">
          {leftButton}
        </Tooltip>,
        React.cloneElement(rightButton as React.ReactElement<any, string>, { loading: true }),
      ]}
    >
      With Tooltip
    </Dropdown.Button>
    <Dropdown items={items} onMenuClick={handleMenuClick}>
      <Button>
        <Space>
          Button
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
    <Dropdown.Button danger onClick={handleButtonClick} items={items} onMenuClick={handleMenuClick}>
      Danger
    </Dropdown.Button>
  </Space>
);

export default App;
```
