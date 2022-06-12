---
order: 99
title:
  zh-CN: 分隔符
  en-US: Split
---

## zh-CN

相邻组件分隔符。

## en-US

Crowded components split.

```tsx
import { Divider, Space, Typography } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Space split={<Divider type="vertical" />}>
    <Typography.Link>Link</Typography.Link>
    <Typography.Link>Link</Typography.Link>
    <Typography.Link>Link</Typography.Link>
  </Space>
);

export default App;
```
