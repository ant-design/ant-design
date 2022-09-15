---
order: 10
title:
  zh-CN: 菜单可选选择
  en-US: Selectable Menu
---

## zh-CN

为 Menu 添加 `selectable` 属性可以开启选择能力。

## en-US

Config Menu `selectable` prop to enable selectable ability.

```tsx
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Space, Typography } from 'antd';
import React from 'react';

const menu = (
  <Menu
    selectable
    defaultSelectedKeys={['3']}
    items={[
      {
        key: '1',
        label: 'Item 1',
      },
      {
        key: '2',
        label: 'Item 2',
      },
      {
        key: '3',
        label: 'Item 3',
      },
    ]}
  />
);

const App: React.FC = () => (
  <Dropdown overlay={menu}>
    <Typography.Link>
      <Space>
        Selectable
        <DownOutlined />
      </Space>
    </Typography.Link>
  </Dropdown>
);

export default App;
```
