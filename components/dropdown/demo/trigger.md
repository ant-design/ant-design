---
order: 3
title:
  zh-CN: 触发方式
  en-US: Trigger mode
---

## zh-CN

默认是移入触发菜单，可以点击触发。

## en-US

The default trigger mode is `hover`, you can change it to `click`.

```tsx
import { Menu, Dropdown, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const menu = (
  <Menu
    items={[
      {
        label: <a href="https://www.antgroup.com">1st menu item</a>,
        key: '0',
      },
      {
        label: <a href="https://www.aliyun.com">2nd menu item</a>,
        key: '1',
      },
      {
        type: 'divider',
      },
      {
        label: '3rd menu item',
        key: '3',
      },
    ]}
  />
);

export default () => (
  <Dropdown overlay={menu} trigger={['click']}>
    <a onClick={e => e.preventDefault()}>
      <Space>
        Click me
        <DownOutlined />
      </Space>
    </a>
  </Dropdown>
);
```
