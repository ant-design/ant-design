---
order: 16
title:
  en-US: Fixed Header
  zh-CN: 固定表头
---

## zh-CN

方便一页内展示大量数据。

需要指定 column 的 `width` 属性，否则列头和内容可能不对齐。

## en-US

Display large amounts of data in scrollable view.

> Specify the width of each column if header and cell do not align properly.

````jsx
import { Table } from 'antd';

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  width: 150,
}, {
  title: '年龄',
  dataIndex: 'age',
  width: 150,
}, {
  title: '住址',
  dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `李大嘴${i}`,
    age: 32,
    address: `西湖区湖底公园${i}号`,
  });
}

ReactDOM.render(
  <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} scroll={{ y: 240 }} />
, mountNode);
````
