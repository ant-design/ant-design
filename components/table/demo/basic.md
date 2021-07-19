---
order: 0
title:
  en-US: Basic Usage
  zh-CN: 基本用法
only: true
---

## zh-CN

简单的表格，最后一列是各种操作。

## en-US

Simple table with actions.

```jsx
import { Table, Tag, Space, Typography } from 'antd';

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
    render: text => {
      return (
        <Typography.Text ellipsis copyable>
          {text}
          {text}
          {text}
          {text}
        </Typography.Text>
      );
    },
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
];

ReactDOM.render(<Table tableLayout="fixed" columns={columns} dataSource={data} />, mountNode);
```
