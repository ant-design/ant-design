---
order: 14.1
version: 4.18.0
title:
  en-US: Order Specific Column
  zh-CN: 特殊列排序
---

## zh-CN

你可以通过 `Table.EXPAND_COLUMN` 和 `Table.SELECT_COLUMN` 来控制选择和展开列的顺序。

## en-US

You can control the order of the expand and select columns by using `Table.EXPAND_COLUMN` and `Table.SELECT_COLUMN`.

```tsx
import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
  description: string;
}

const columns: ColumnsType<DataType> = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  Table.EXPAND_COLUMN,
  { title: 'Age', dataIndex: 'age', key: 'age' },
  Table.SELECTION_COLUMN,
  { title: 'Address', dataIndex: 'address', key: 'address' },
];

const data: DataType[] = [
  {
    key: 1,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Not Expandable',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
  },
];

const App: React.FC = () => (
  <Table
    columns={columns}
    rowSelection={{}}
    expandable={{
      expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
    }}
    dataSource={data}
  />
);

export default App;
```
