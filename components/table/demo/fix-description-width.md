---
order: 99
title:
  zh-CN: 修复描述组件宽度
  en-US: Fix Description Width Issue
debug: true
---

## zh-CN

测试修复 Table 设置 `scroll={{ x: 'max-content' }}` 后内部的 Description 组件宽度问题。

## en-US

Test fix for Description component width issue when Table has `scroll={{ x: 'max-content' }}`.

```tsx
import React from 'react';
import { Table, Descriptions } from 'antd';
import type { TableColumnsType } from 'antd';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    style: { width: '100%' },
  },
  {
    title: 'Age', 
    dataIndex: 'age',
    style: { width: 'max-content' },
  },
  {
    title: 'Description Column',
    render: () => (
      <Descriptions size="small">
        <Descriptions.Item label="产品">高精度移液器套装</Descriptions.Item>
        <Descriptions.Item label="货号">1234567890</Descriptions.Item>
        <Descriptions.Item label="类型">1</Descriptions.Item>
      </Descriptions>
    ),
  },
];

const dataSource: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
];

const expandedRowRender = () => (
  <div>
    <h4>Without bordered:</h4>
    <Descriptions>
      <Descriptions.Item label="产品">高精度移液器套装</Descriptions.Item>
      <Descriptions.Item label="货号">1234567890</Descriptions.Item>
      <Descriptions.Item label="类型">1</Descriptions.Item>
    </Descriptions>
    
    <h4>With bordered:</h4>
    <Descriptions bordered>
      <Descriptions.Item label="产品">高精度移液器套装</Descriptions.Item>
      <Descriptions.Item label="货号">1234567890</Descriptions.Item>
      <Descriptions.Item label="类型">1</Descriptions.Item>
    </Descriptions>
  </div>
);

const App: React.FC = () => (
  <div>
    <h3>Normal Table (no scroll)</h3>
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
    />
    
    <h3>Table with scroll x: max-content</h3>
    <Table
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: 'max-content' }}
      pagination={false}
      expandable={{
        expandedRowRender,
        defaultExpandedRowKeys: ['1'],
      }}
    />
  </div>
);

export default App;
```