---
order: 9
title:
  en-US: No pagination
  zh-CN: 不显示分页
---

## zh-CN

传入 pagination 为 false 即可。此时表格将完整显示 dataSource 内的数据，不进行任何分页。

## en-US

Set `pagination={false}`, then no data paging and pagination will be shown.

````jsx
import { Table } from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
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

ReactDOM.render(<Table columns={columns} dataSource={data} pagination={false} />
, mountNode);
````
