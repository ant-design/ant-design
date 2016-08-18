---
order: 20
hidden: true
title:
  en-US: paging the columns
  zh-CN: 列分页
---

## zh-CN

对于列数很多的数据，可以进行横向的分页，通过切换符切换当前展现的列。

## en-US

You can split long columns to switchable views.

````jsx
import { Table } from 'antd';

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '列1', dataIndex: 'age', key: '1' },
  { title: '列2', dataIndex: 'age', key: '2' },
  { title: '列3', dataIndex: 'age', key: '3' },
  { title: '列4', dataIndex: 'age', key: '4' },
  { title: '列5', dataIndex: 'age', key: '5' },
  { title: '列6', dataIndex: 'age', key: '6' },
  { title: '列7', dataIndex: 'age', key: '7' },
  { title: '列8', dataIndex: 'age', key: '8' },
  {
    title: '操作',
    key: 'operation',
    render: () => <a href="#">操作</a>,
  },
];

const data = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
}];

ReactDOM.render(<Table columns={columns} dataSource={data} columnsPageRange={[2, 9]} columnsPageSize={4} />, mountNode);
````
