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

```tsx
import { NotificationOutlined } from '@ant-design/icons';
import { Badge } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <>
    <Badge dot>
      <NotificationOutlined style={{ fontSize: 16 }} />
    </Badge>
    <Badge dot>
      <a href="#">Link something</a>
    </Badge>
  </>
);

export default App;
```
