---
order: 4
title:
  zh-CN: 带排序的搜索
  en-US: Search with sort
---

## zh-CN

在搜索模式下对过滤结果项进行排序

## en-US

Search the options with sorting

```jsx
import { Select } from 'antd';

const { Option } = Select;

ReactDOM.render(
  <Select
    showSearch
    style={{ width: 200 }}
    placeholder="Search to Select"
    optionFilterProp="children"
    filterOption={(input, option) =>
      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
    }
    filterSort={(optionA, optionB) =>
      optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
    }
  >
    <Option value="1">Not Identified</Option>
    <Option value="2">Closed</Option>
    <Option value="3">Communicated</Option>
    <Option value="4">Identified</Option>
    <Option value="5">Resolved</Option>
    <Option value="6">Cancelled</Option>
  </Select>,
  mountNode,
);
```
