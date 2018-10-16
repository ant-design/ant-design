---
order: 19
title:
  en-US: Fixed Columns and Header
  zh-CN: 固定头和列
---

## zh-CN

适合同时展示有大量数据和数据列。

> 若列头与内容不对齐或出现列重复，请指定列的宽度 `width`。

> 建议指定 `scroll.x` 为大于表格宽度的固定值或百分比。注意，且非固定列宽度之和不要超过 `scroll.x`。

## en-US

A Solution for displaying large amounts of data with long columns.

> Specify the width of columns if header and cell do not align properly.

> A fixed value which is greater than table width for `scroll.x` is recommended. The sum of unfixed columns should not greater than `scroll.x`.

````jsx
import { Table } from 'antd';

const columns = [
  { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
  { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
  { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
  { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
  { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
  { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
  { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a href="javascript:;">action</a>,
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}

ReactDOM.render(<Table columns={columns} dataSource={data} scroll={{ x: 1500, y: 300 }} />, mountNode);
````
