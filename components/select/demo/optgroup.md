---
order: 6
title:
  zh-CN: 分组
  en-US: Option Group
---

## zh-CN

用 `OptGroup` 进行选项分组。

## en-US

Using `OptGroup` to group the options.

```tsx
import { Select } from 'antd';
import React from 'react';

const { Option, OptGroup } = Select;

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const App: React.FC = () => (
  <Select defaultValue="lucy" style={{ width: 200 }} onChange={handleChange}>
    <OptGroup label="Manager">
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
    </OptGroup>
    <OptGroup label="Engineer">
      <Option value="Yiminghe">yiminghe</Option>
    </OptGroup>
  </Select>
);

export default App;
```
