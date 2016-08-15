---
order: 3
title:
  en-US: Checkbox props
  zh-CN: 选择框属性
---

## zh-CN

配置选择框的默认属性。

## en-US

Set props to Checkbox or Radio.

````jsx
import { Table } from 'antd';

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: '年龄',
  dataIndex: 'age',
}, {
  title: '住址',
  dataIndex: 'address',
}];
const data = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号',
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号',
}, {
  key: '3',
  name: '李大嘴',
  age: 32,
  address: '西湖区湖底公园1号',
}];

// 通过 rowSelection 对象表明需要行选择
const rowSelection = {
  getCheckboxProps: record => ({
    disabled: record.name === '胡彦祖',    // 配置无法勾选的列
  }),
};

ReactDOM.render(<Table rowSelection={rowSelection} columns={columns} dataSource={data} />
, mountNode);
````
