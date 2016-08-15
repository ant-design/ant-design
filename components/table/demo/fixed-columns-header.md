---
order: 18
title:
  en-US: Fixed Columns and Header
  zh-CN: 固定头和列
---

## zh-CN

适合同时展示有大量数据和数据列。

> 若列头与内容不对齐，请指定每列宽度 `width`。

> 建议指定 scroll.x 为固定宽度。

## en-US

Suitable for large amounts of data with long columns.

> Specify the width of each column if header and cell do not align properly.

> A fixed width for `scroll.x` is recommended.

````jsx
import { Table } from 'antd';

const columns = [
  { title: '姓名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: '年龄', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: '列1', dataIndex: 'address', key: '1', width: 150 },
  { title: '列2', dataIndex: 'address', key: '2', width: 150 },
  { title: '列3', dataIndex: 'address', key: '3', width: 150 },
  { title: '列4', dataIndex: 'address', key: '4', width: 150 },
  { title: '列5', dataIndex: 'address', key: '5', width: 150 },
  { title: '列6', dataIndex: 'address', key: '6', width: 150 },
  { title: '列7', dataIndex: 'address', key: '7', width: 150 },
  { title: '列8', dataIndex: 'address', key: '8', width: 150 },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a href="#">操作</a>,
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `李大嘴${i}`,
    age: 32,
    address: `西湖区湖底公园${i}号`,
  });
}

function App() {
  return <Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />;
}

ReactDOM.render(<App />, mountNode);
````
