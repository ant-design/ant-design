---
order: 19
title:
  zh-CN: 自定义状态
  en-US: Status
---

## zh-CN

使用 `status` 添加状态。

## en-US

Add status with `status`.

```tsx
import React from 'react';
import { Radio, Space } from 'antd';

const ValidateInputs: React.FC = () => (
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

ReactDOM.render(<ValidateInputs />, mountNode);
```
