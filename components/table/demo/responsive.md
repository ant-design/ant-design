---
order: 31
title:
  zh-CN: 响应式
  en-US: Responsive
---

## zh-CN

响应式配置列的展示。

## en-US

Responsive columns.

```tsx
import { Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name (all screens)',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age (medium screen or bigger)',
    dataIndex: 'age',
    key: 'age',
    responsive: ['md'],
  },
  {
    title: 'Address (large screen or bigger)',
    dataIndex: 'address',
    key: 'address',
    responsive: ['lg'],
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
];

const App: React.FC = () => <Table columns={columns} dataSource={data} />;

export default App;
```
