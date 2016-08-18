---
order: 17
title:
  en-US: Fixed Columns
  zh-CN: 固定列
---

## zh-CN

对于列数很多的数据，可以固定前后的列，横向滚动查看其它数据，需要和 `scroll.x` 配合使用。

> 若列头与内容不对齐，请指定每列宽度 `width`。

> 建议指定 scroll.x 为固定宽度。

## en-US

Fix some columns and scroll in other columns. You must set `scoll.x` meanwhile.

> Specify the width of each column if header and cell do not align properly.

> A fixed width for `scroll.x` is recommended.

````jsx
import { Table } from 'antd';

const columns = [
  { title: '姓名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: '年龄', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: '列1', dataIndex: 'address', key: '1' },
  { title: '列2', dataIndex: 'address', key: '2' },
  { title: '列3', dataIndex: 'address', key: '3' },
  { title: '列4', dataIndex: 'address', key: '4' },
  { title: '列5', dataIndex: 'address', key: '5' },
  { title: '列6', dataIndex: 'address', key: '6' },
  { title: '列7', dataIndex: 'address', key: '7' },
  { title: '列8', dataIndex: 'address', key: '8' },
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
  address: '西湖区湖底公园0号',
}, {
  key: '2',
  name: '胡彦祖',
  age: 40,
  address: '西湖区湖底公园1号',
}];

function App() {
  return <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />;
}

ReactDOM.render(<App />, mountNode);
````
