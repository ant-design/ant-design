# 边框

- order: 10

添加表格边框线，`bordered={true}`。

---

````jsx
import { Table } from 'antd';

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  render: function(text) {
    return <a href="javascript:;">{text}</a>;
  }
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

ReactDOM.render(<Table columns={columns} dataSource={data} bordered={true} />
, document.getElementById('components-table-demo-bordered'));
````
