# 中小型列表

- order: 9

紧凑型的列表, 中型列表用于需要数据紧凑展示的情况，小型列表只用于对话框内。

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

ReactDOM.render(<div>
  <h4>中号表格（紧凑型）</h4>
  <Table columns={columns} dataSource={data} size="middle" />
  <h4>小号表格</h4>
  <Table columns={columns} dataSource={data} size="small" />
</div>, document.getElementById('components-table-demo-size'));
````

<style>#components-table-demo-size h4 { margin-bottom: 16px; }</style>
