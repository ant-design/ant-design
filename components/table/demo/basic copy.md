---
order: 18
title:
  en-US: Empty Page Usage
  zh-CN: 基本用法
---

## zh-CN

简单的表格，最后一列是各种操作。

## en-US

Simple table with actions.

```jsx
import { Table, Space } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [];

ReactDOM.render(
  <Table
    columns={columns}
    dataSource={data}
    locale={{ emptyText: 'This string is for empty data.' }}
  />,
  mountNode,
);
```
