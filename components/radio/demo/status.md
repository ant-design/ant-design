---
order: 19
version: 4.19.0
title:
  zh-CN: 自定义状态
  en-US: Status
---

## zh-CN

使用 `status` 为 Radio.Group 添加状态，可选 `error` 或者 `warning`。

## en-US

Add status to Radio.Group with `status`, which could be `error` or `warning`.

```tsx
import React from 'react';
import { Radio, Space } from 'antd';

const Status: React.FC = () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Radio.Group status="error">
      <Radio.Button value="a">Male</Radio.Button>
      <Radio.Button value="b">Female</Radio.Button>
      <Radio.Button value="c">Unknown</Radio.Button>
    </Radio.Group>
    <Radio.Group status="warning">
      <Radio.Button value="a">Male</Radio.Button>
      <Radio.Button value="b">Female</Radio.Button>
      <Radio.Button value="c">Unknown</Radio.Button>
    </Radio.Group>
  </Space>
);

ReactDOM.render(<Status />, mountNode);
```
