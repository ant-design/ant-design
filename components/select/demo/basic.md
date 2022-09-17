---
order: 0
title:
  zh-CN: 基本使用
  en-US: Basic Usage
---

## zh-CN

基本使用。

## en-US

Basic Usage.

```tsx
import { Select } from 'antd';
import React from 'react';

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const App: React.FC = () => (
  <>
    <Select
      defaultValue="lucy"
      style={{ width: 120 }}
      onChange={handleChange}
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
          value: 'disabled',
          disabled: true,
          label: 'Disabled',
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
      options={[
        {
          value: 'lucy',
          label: 'Lucy',
        },
      ]}
    />
    <Select
      defaultValue="lucy"
      style={{ width: 120 }}
      loading
      options={[
        {
          value: 'lucy',
          label: 'Lucy',
        },
      ]}
    />
    <Select
      defaultValue="lucy"
      style={{ width: 120 }}
      allowClear
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
