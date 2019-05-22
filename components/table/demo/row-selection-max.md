---
order: 33
title:
  en-US: Max Selection
  zh-CN: 最大可选数
---

## zh-CN

maxSelection 设置最大可选择数量

## en-US

Set max selectable rows by `maxSelection`

```jsx
import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: text => <a href="javascript:;">{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];
const data = [
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
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No. 1 Lake Park',
  },
];

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKseys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
};

ReactDOM.render(
  <Table rowSelection={rowSelection} maxSelection={2} columns={columns} dataSource={data} />,
  mountNode,
);
```
