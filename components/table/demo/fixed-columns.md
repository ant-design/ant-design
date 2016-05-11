---
order: 17
title: 固定列
---

对于列数很多的数据，可以固定前后的列，横向滚动查看其它数据，需要和 `scroll.x` 配合使用。

> 需要指定 scroll.x 为宽度，或者指定每列宽度 `width`，否则可能有错位问题。

````jsx
import { Table } from 'antd';

const columns = [
  { title: '姓名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: '年龄', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
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
    fixed: 'right',
    width: 100,
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

function App() {
  return <Table columns={columns} dataSource={data} scroll={{ x: 1000 }} />;
}

ReactDOM.render(<App />, mountNode);
````
