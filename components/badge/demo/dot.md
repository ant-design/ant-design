---
order: 3
title:
  zh-CN: 讨嫌的小红点
  en-US: Red badge
---

## zh-CN

没有具体的数字。

## en-US

This will simply display a red badge, without a specific count. If count equals 0, it won't display the dot.

```jsx
import { Badge } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';

export default () => (
  <>
    <Badge dot>
      <NotificationOutlined style={{ fontSize: 16 }} />
    </Badge>
    <Badge dot>
      <a href="#">Link something</a>
    </Badge>
  </>
);
```
