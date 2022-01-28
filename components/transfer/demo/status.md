---
order: 10
title:
  zh-CN: 自定义状态
  en-US: Status
---

## zh-CN

使用 `status` 为 Transfer 添加状态。

## en-US

Add status to Transfer with `status`.

```jsx
import React from 'react';
import { Transfer, Space } from 'antd';

const App = () => (
  <Space direction="vertical">
    <Transfer status="error" />
    <Transfer status="warning" showSearch />
  </Space>
);

ReactDOM.render(<App />, mountNode);
```
