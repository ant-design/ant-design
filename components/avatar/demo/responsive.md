---
order: 5
title:
  zh-CN: 响应式尺寸
  en-US: Responsive Size
---

## zh-CN

头像大小可以根据屏幕大小自动调整。

## en-US

Avatar size can be automatically adjusted based on the screen size.

```tsx
import { Avatar } from 'antd';
import { AntDesignOutlined } from '@ant-design/icons';

ReactDOM.render(
  <Avatar
    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
    icon={<AntDesignOutlined />}
  />,
  mountNode,
);
```
