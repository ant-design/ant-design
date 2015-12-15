# 外界控制数据

- order: 11
- hidden: true

由父元素控制自身数据展示。

---

````jsx
import { Table, Button } from 'antd';

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  render: function(text) {
    return <a href="#">{text}</a>;
  }
}, {
  title: '年龄',
  dataIndex: 'age'
}, {
  title: '住址',
  dataIndex: 'address'
}];
const data1 = [{
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
const data2 = [{
  key: '11',
  name: '胡彦斌2',
  age: 32,
  address: '西湖区湖底公园2号'
}, {
  key: '2',
  name: '胡彦祖2',
  age: 42,
  address: '西湖区湖底公园2号'
}, {
  key: '33',
  name: '李大嘴2',
  age: 32,
  address: '西湖区湖底公园2号'
}];

const App = React.createClass({
  getInitialState() {
    return {
      data: []
    };
  },
  handleClick1() {
    this.setState({
      data: data1
    });
  },
  handleClick2() {
    this.setState({
      data: data2
    });
  },
  render() {
    // 通过 rowSelection 对象表明需要行选择
    const rowSelection = {
      onSelect: function(record, selected, selectedRows) {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: function(selected, selectedRows) {
        console.log(selected, selectedRows);
      }
    };
    return <div>
      <Table columns={columns} dataSource={this.state.data} rowSelection={rowSelection} />
      <Button onClick={this.handleClick1}>加载本地数据1</Button>
      &nbsp;
      <Button onClick={this.handleClick2}>加载本地数据2</Button>
    </div>;
  }
});

ReactDOM.render(<App />
, document.getElementById('components-table-demo-local-data'));
````
