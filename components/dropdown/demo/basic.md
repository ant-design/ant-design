---
order: 0
title:
  zh-CN: 基本
  en-US: Basic
---

## zh-CN

最简单的下拉菜单。

## en-US

The most basic dropdown menu.

```jsx
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const menu = (
  <Menu
    items={[
      {
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            1st menu item
          </a>
        ),
      },
      {
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            2nd menu item (disabled)
          </a>
        ),
        icon: <DownOutlined />,
        disabled: true,
      },
      {
        label: (
          <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
            3rd menu item (disabled)
          </a>
        ),
        disabled: true,
      },
      {
        danger: true,
        label: 'a danger item',
      },
    ]}
  />
);

export default () => (
  <Dropdown overlay={menu}>
    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
      Hover me <DownOutlined />
    </a>
  </Dropdown>
);
```
