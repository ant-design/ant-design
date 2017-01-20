---
order: 6
title:
  en-US: Pagination
  zh-CN: 分页
---

## zh-CN

表格中的分页器可以通过一个配置对象来配置，当 `pagination={false}` 时，会隐藏分页器。

## en-US

The pagination in table could be configured with an object, and you can use `pagination={false}` to turn off pagination.

````__react
import { Table } from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  });
}

const pagination = {
  total: data.length,
  showSizeChanger: true,
  onShowSizeChange: (current, pageSize) => {
    console.log('Current: ', current, '; PageSize: ', pageSize);
  },
  onChange: (current) => {
    console.log('Current: ', current);
  },
};

ReactDOM.render(
  <Table columns={columns} dataSource={data} pagination={pagination} />
, mountNode);
````
