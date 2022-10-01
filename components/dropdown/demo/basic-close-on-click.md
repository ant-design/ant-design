---
order: 10
title:
  zh-CN: 控制点击菜单项关闭下拉菜单
  en-US: control dropdown visibility by closeOnSelectKeys
---

## zh-CN

通过`closeOnSelectKeys`属性控制点击菜单项关闭下拉菜单

## en-US

control dropdown visibility by closeOnSelectKeys

```tsx
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import React from 'react';

const menu = (
  <Menu
    items={[
      {
        key: '1',
        label: 'menu item 1',
        title: 'menu item 1',
      },
      {
        key: '2',
        label: 'menu item 2',
        title: 'menu item 2',
        icon: <SmileOutlined />,
      },
      {
        key: '3',
        label: 'menu item 3',
        title: 'menu item 3',
      },
      {
        key: 'close',
        danger: true,
        label: 'close',
        title: 'close',
      },
    ]}
  />
);

const App: React.FC = () => (
  <Dropdown closeOnSelectKeys={[]} overlay={menu}>
    <a onClick={e => e.preventDefault()}>
      <Space>
        Hover me
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);

export default App;
```
