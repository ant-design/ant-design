---
order: 8
title:
  zh-CN: 只设置图标
  en-US: With Icon only
---

## zh-CN

在 Segmented Item 选项中只设置 Icon。

## en-US

Set `icon` without `label` for Segmented Item.

```jsx
import { Segmented } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';

export default () => (
  <Segmented
    options={[
      {
        value: 'List',
        icon: <BarsOutlined />,
      },
      {
        value: 'Kanban',
        icon: <AppstoreOutlined />,
      },
    ]}
  />
);
```
