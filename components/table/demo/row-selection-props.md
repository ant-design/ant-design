---
order: 4
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
const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

// rowSelection object indicates the need for row selection
const rowSelection = {
  getCheckboxProps: record => ({
    disabled: record.name === 'Jim Green',    // Column configuration not to be checked
  }),
};

ReactDOM.render(<Table rowSelection={rowSelection} columns={columns} dataSource={data} />
, mountNode);
````
