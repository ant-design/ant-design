---
order: 10
title:
  en-US: border, title and footer
  zh-CN: 基本用法
---

## zh-CN

添加表格边框线，页头和页脚。

## en-US

Add border, title and footer for table.

````jsx
import { Table } from 'antd';

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  render: (text) => <a href="#">{text}</a>,
}, {
  title: '资产',
  className: 'column-money',
  dataIndex: 'money',
}, {
  title: '住址',
  dataIndex: 'address',
}];

const data = [{
  key: '1',
  name: '胡彦斌',
  money: '￥300,000.00',
  address: '西湖区湖底公园1号',
}, {
  key: '2',
  name: '胡彦祖',
  money: '￥1,256,000.00',
  address: '西湖区湖底公园1号',
}, {
  key: '3',
  name: '李大嘴',
  money: '￥120,000.00',
  address: '西湖区湖底公园1号',
}];

ReactDOM.render(
  <Table
    columns={columns}
    dataSource={data}
    bordered
    title={() => '页头'}
    footer={() => '页脚'}
  />
, mountNode);
````

````css
.column-money {
  text-align: right;
}
````
