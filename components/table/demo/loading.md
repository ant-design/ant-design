# 加载中的表格

- order: 14

用属性 `loading` 控制表格加载中状态。

---

````jsx
import { Table, Button } from 'antd';

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

const App = React.createClass({
  getInitialState() {
    return {
      loading: false
    };
  },
  toggleLoading() {
    this.setState({
      loading: !this.state.loading
    });
  },
  render() {
    return <div>
      <Table columns={columns} dataSource={data} loading={this.state.loading} />
      <Button type="primary" onClick={this.toggleLoading}>切换 loading 状态</Button>
    </div>;
  }
});

ReactDOM.render(<App />, document.getElementById('components-table-demo-loading'));
````
