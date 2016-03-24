# 固定列

- order: 17

对于列数很多的数据，可以固定前后的列，横向滚动查看其它数据，需要和 `scroll={{ x: true }}` 配合使用。

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

const data = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
}];

const App = React.createClass({
  render() {
    return <Table columns={columns} dataSource={data} scroll={{ x: true }} />;
  }
});

ReactDOM.render(<App />, mountNode);
````
