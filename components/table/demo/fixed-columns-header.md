---
order: 19
title:
  en-US: Fixed Columns and Header
  zh-CN: 固定头和列
---

## zh-CN

适合同时展示有大量数据和数据列。

> 若列头与内容不对齐，请指定列的宽度 `width`。

> 建议指定 `scroll.x` 为大于表格宽度的固定值。注意，且非固定列宽度之和不要超过 `scroll.x`。

> 如果希望 `scroll.x` 为自适应内容宽度，可以指定 `scroll={{ x: true }}`。注意不要设置滚动区域单元格内容的宽度，并指定 `white-space: nowrap` 样式强制其不自动换行。

## en-US

A Solution for displaying large amounts of data with long columns.

> Specify the width of columns if header and cell do not align properly.

> A fixed value which is greater than table width for `scroll.x` is recommended. The sum of unfixed columns should not greater than `scroll.x`.

> If you hope the `scroll.x` will adapt content's witdh, you can set `scroll={{ x: true }}`. Then use css `white-space: nowrap` to make sure the content of table cell inside scrollable area will not be wrapped.

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
    render: () => <a href="#">action</a>,
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
