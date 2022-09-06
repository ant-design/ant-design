---
order: 4
title:
  zh-CN: 带排序的搜索
  en-US: Search with sort
---

## zh-CN

在搜索模式下对过滤结果项进行排序。

## en-US

Search the options with sorting.

```tsx
import { Select } from 'antd';
import React from 'react';

const { Option } = Select;

const App: React.FC = () => (
  <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Search to Select"
    optionFilterProp="children"
    filterOption={(input, option) => (option!.children as unknown as string).includes(input)}
    filterSort={(optionA, optionB) =>
      (optionA!.children as unknown as string)
        .toLowerCase()
        .localeCompare((optionB!.children as unknown as string).toLowerCase())
    }
  >
    <Option value="1">Not Identified</Option>
    <Option value="2">Closed</Option>
    <Option value="3">Communicated</Option>
    <Option value="4">Identified</Option>
    <Option value="5">Resolved</Option>
    <Option value="6">Cancelled</Option>
  </Select>
);

export default App;
```
