---
order: 6
title:
  zh-CN: 多级菜单
  en-US: Cascading menu
---

## zh-CN

传入的菜单里有多个层级。

## en-US

The menu has multiple levels.

```tsx
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space } from 'antd';
import React from 'react';

const menu = (
  <Menu
    items={[
      {
        key: '1',
        type: 'group',
        label: 'Group title',
        children: [
          {
            key: '1-1',
            label: '1st menu item',
          },
          {
            key: '1-2',
            label: '2nd menu item',
          },
        ],
      },
      {
        key: '2',
        label: 'sub menu',
        children: [
          {
            key: '2-1',
            label: '3rd menu item',
          },
          {
            key: '2-2',
            label: '4th menu item',
          },
        ],
      },
      {
        key: '3',
        label: 'disabled sub menu',
        disabled: true,
        children: [
          {
            key: '3-1',
            label: '5d menu item',
          },
          {
            key: '3-2',
            label: '6th menu item',
          },
        ],
      },
    ]}
  />
);

const App: React.FC = () => (
  <Dropdown overlay={menu}>
    <a onClick={e => e.preventDefault()}>
      <Space>
        Cascading menu
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);

export default App;
```
