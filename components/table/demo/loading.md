---
order: 14
title:
  en-US: Loading
  zh-CN: 加载中的表格
---

## zh-CN

用属性 `loading` 控制表格加载中状态。

## en-US

Controll loading states by `loading` property.

````jsx
import { Table, Button } from 'antd';

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

const App = React.createClass({
  getInitialState() {
    return {
      loading: false,
    };
  },
  toggleLoading() {
    this.setState({
      loading: !this.state.loading,
    });
  },
  render() {
    return (
      <div>
        <Table columns={columns} dataSource={data} loading={this.state.loading} />
        <Button type="primary" onClick={this.toggleLoading}>Switch loading state</Button>
      </div>
    );
  },
});

ReactDOM.render(<App />, mountNode);
````
