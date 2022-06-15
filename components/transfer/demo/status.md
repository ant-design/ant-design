---
order: 10
version: 4.19.0
title:
  zh-CN: 自定义状态
  en-US: Status
---

## zh-CN

使用 `status` 为 Transfer 添加状态，可选 `error` 或者 `warning`。

## en-US

Add status to Transfer with `status`, which could be `error` or `warning`.

```tsx
import { Space, Transfer } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Space direction="vertical">
    <Transfer status="error" />
    <Transfer status="warning" showSearch />
  </Space>
);

export default App;
```
