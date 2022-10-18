---
order: 23
title:
  zh-CN: 无边框
  en-US: Bordered-less
---

## zh-CN

无边框样式。

## en-US

Bordered-less style component.

```tsx
import { Select } from 'antd';
import React from 'react';

const App: React.FC = () => (
  <>
    <Select
      defaultValue="lucy"
      style={{ width: 120 }}
      bordered={false}
      options={[
        {
          value: 'jack',
          label: 'Jack',
        },
        {
          value: 'lucy',
          label: 'Lucy',
        },
        {
          value: 'Yiminghe',
          label: 'yiminghe',
        },
      ]}
    />
    <Select
      defaultValue="lucy"
      style={{ width: 120 }}
      disabled
      bordered={false}
      options={[
        {
          value: 'lucy',
          label: 'Lucy',
        },
      ]}
    />
  </>
);

export default App;
```
