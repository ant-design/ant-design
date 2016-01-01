# 选择和操作

- order: 4

选择后进行操作，完成后清空选择，通过 `rowSelection.selectedRowKeys` 来控制选中项。

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
      selectedRowKeys: [],
      loading: false,
    };
  },
  start() {
    this.setState({ loading: true });
    // 模拟 ajax 请求，完成后清空
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false,
      });
    }, 1000);
  },
  onSelectChange(selectedRowKeys) {
    console.log('onSelectChange', selectedRowKeys)
    this.setState({ selectedRowKeys });
  },
  render() {
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    return <div>
      <div style={{marginBottom: 16}}>
         <Button type="primary" onClick={this.start}
           disabled={!hasSelected} loading={loading}>操作</Button>
         <span style={{marginLeft: 8}}>{hasSelected ? `选择了 ${selectedRowKeys.length} 个对象` : ''}</span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>;
  }
});

ReactDOM.render(<App />, mountNode);
````
