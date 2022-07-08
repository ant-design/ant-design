---
order: 98
title:
  zh-CN: Borderless Debug
  en-US: Borderless Debug
debug: true
---

## zh-CN

Buggy!

## en-US

Buggy!

```tsx
import { Input } from 'antd';
import React from 'react';

const { TextArea } = Input;

const App: React.FC = () => (
  <div style={{ backgroundColor: 'rgba(0, 0, 128, .2)' }}>
    <Input placeholder="Unbordered" bordered={false} />
    <Input placeholder="Unbordered" bordered={false} size="large" />
    <TextArea placeholder="Unbordered" bordered={false} />
    <TextArea placeholder="Unbordered" bordered={false} allowClear />
    <Input placeholder="Unbordered" bordered={false} allowClear />
    <Input prefix="￥" suffix="RMB" bordered={false} />
    <Input prefix="￥" suffix="RMB" disabled bordered={false} />
  </div>
);

export default App;
```
