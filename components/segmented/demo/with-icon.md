---
order: 7
title:
  zh-CN: 设置图标
  en-US: With Icon
---

## zh-CN

给 Segmented Item 设置 Icon。

## en-US

Set `icon` for Segmented Item.

```jsx
import { Segmented } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';

export default () => (
  <Segmented
    options={[
      {
        label: 'List',
        value: 'List',
        icon: <BarsOutlined />,
      },
      {
        label: 'Kanban',
        value: 'Kanban',
        icon: <AppstoreOutlined />,
      },
    ]}
  />
);
```
