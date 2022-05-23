---
order: 16
version: 4.19.0
title:
  zh-CN: 自定义状态
  en-US: Status
---

## zh-CN

使用 `status` 为 Cascader 添加状态，可选 `error` 或者 `warning`。

## en-US

Add status to Cascader with `status`, which could be `error` or `warning`.

```tsx
import { Cascader, Space } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <Space direction="vertical">
    <Cascader status="error" placeholder="Error" />
    <Cascader status="warning" multiple placeholder="Warning multiple" />
  </Space>
);

export default App;
```
