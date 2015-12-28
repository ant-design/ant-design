# 不显示分页

- order: 8

传入 pagination 为 false 即可。此时表格将完整显示 dataSource 内的数据，不进行任何分页。

---

````jsx
import { Table } from 'antd';

const columns = [{
  title: '姓名',
  dataIndex: 'name'
}, {
  title: '年龄',
  dataIndex: 'age'
}, {
  title: '住址',
  dataIndex: 'address'
}];

const data = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}, {
  key: '3',
  name: '李大嘴',
  age: 32,
  address: '西湖区湖底公园1号'
}];

ReactDOM.render(<Table columns={columns} dataSource={data} pagination={false} />
, document.getElementById('components-table-demo-nopagination'));
````
