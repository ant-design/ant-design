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

```jsx
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

const menu = (
  <Menu
    items={[
      {
        type: 'group',
        label: 'Group title',
        children: [
          {
            label: '1st menu item',
          },
          {
            label: '2nd menu item',
          },
        ],
      },
      {
        label: 'sub menu',
        children: [
          {
            label: '3rd menu item',
          },
          {
            label: '4th menu item',
          },
        ],
      },
      {
        label: 'disabled sub menu',
        disabled: true,
        children: [
          {
            label: '5d menu item',
          },
          {
            label: '6th menu item',
          },
        ],
      },
    ]}
  />
);

export default () => (
  <Dropdown overlay={menu}>
    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
      Cascading menu <DownOutlined />
    </a>
  </Dropdown>
);
```
