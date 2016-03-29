# 重置筛选和排序

- order: 6

使用受控属性对筛选和排序状态进行控制。

---

````jsx
import { Table } from 'antd';

const data = [{
  key: '1',
  name: '胡斌',
  age: 32,
  address: '南湖区湖底公园1号',
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园12号',
}, {
  key: '3',
  name: '李大嘴',
  age: 32,
  address: '南湖区湖底公园123号',
}, {
  key: '4',
  name: '李秀莲大嘴哥',
  age: 32,
  address: '西湖区湖底公园123号',
}];

const App = React.createClass({
  getInitialState() {
    return {
      filteredValue: {},
      sortedValue: {},
    };
  },
  handleChange(pagination, filters, sorter) {
    console.log('各类参数是', pagination, filters, sorter);
    this.setState({
      filteredValue: filters,
      sortedValue: sorter,
    });
  },
  clearFilters(e) {
    e.preventDefault();
    this.setState({ filteredValue: {} });
  },
  setAgeSort(e) {
    e.preventDefault();
    this.setState({
      sortedValue: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  },
  render() {
    const { sortedValue, filteredValue } = this.state;
    sortedValue.column = sortedValue.column || {};
    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      filters: [
        { text: '姓李的', value: '李' },
        { text: '姓胡的', value: '胡' },
      ],
      filteredValue: filteredValue.name,
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sorted: sortedValue.columnKey === 'name' && sortedValue.order,
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sorted: sortedValue.columnKey === 'age' && sortedValue.order,
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      filters: [
        { text: '南湖', value: '南湖' },
        { text: '西湖', value: '西湖' },
      ],
      filteredValue: filteredValue.address,
      onFilter: (value, record) => record.address.indexOf(value) === 0,
      sorter: (a, b) => a.address.length - b.address.length,
      sorted: sortedValue.columnKey === 'address' && sortedValue.order,
    }];
    return (
      <div>
        <div className="table-operations">
          <a href="#" onClick={this.clearFilters}>清除筛选</a>
          <a href="#" onClick={this.setAgeSort}>年龄降序排序</a>
        </div>
        <Table columns={columns} dataSource={data} onChange={this.handleChange} />
      </div>
    );
  }
});

ReactDOM.render(<App />, mountNode);
````

````css
.table-operations {
  font-size: 12px;
  text-align: right;
  margin-bottom: 16px;
}

.table-operations a {
  margin-left: 8px;
}
````
