# 固定表头

- order: 16

方便一页内展示大量数据。

---

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
    address: `西湖区湖底公园${i}号`
  });
}

ReactDOM.render(
  <Table columns={columns} dataSource={data} pagination={{ pageSize: 50 }} useFixedHeader />
, mountNode);
````
