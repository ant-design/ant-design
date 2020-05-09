---
order: 18
title:
  en-US: Fixed Header and auto height
  zh-CN: 固定表头并自适应可用高度
---

## zh-CN

在固定表头的基础上，允许自动撑满可视区域可用高度空间

## en-US

Base on `fixed header`, it can automatically fill the available height space of the screen visible area

```jsx
import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 150,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 150,
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

ReactDOM.render(
  <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: true }} />,
  mountNode,
);
```
