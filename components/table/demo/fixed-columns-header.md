# 固定头和列

- order: 18

适合同时展示有大量数据和数据列。

> 需要给每列都指定宽度 `width`。

---

````jsx
import { Table } from 'antd';

const columns = [
  { title: '姓名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
  { title: '年龄', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
  { title: '列1', width: 75, dataIndex: 'age', key: '1' },
  { title: '列2', width: 75, dataIndex: 'age', key: '2' },
  { title: '列3', width: 75, dataIndex: 'age', key: '3' },
  { title: '列4', width: 75, dataIndex: 'age', key: '4' },
  { title: '列5', width: 75, dataIndex: 'age', key: '5' },
  { title: '列6', width: 75, dataIndex: 'age', key: '6' },
  { title: '列7', width: 75, dataIndex: 'age', key: '7' },
  { title: '列8', width: 75, dataIndex: 'age', key: '8' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a href="#">操作</a>,
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: `李大嘴${i}`,
    age: 32,
    address: `西湖区湖底公园${i}号`
  });
}

const App = React.createClass({
  render() {
    return <Table columns={columns} dataSource={data} scroll={{ x: true, y: 300 }} />;
  }
});

ReactDOM.render(<App />, mountNode);
````
