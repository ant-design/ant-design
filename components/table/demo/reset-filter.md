---
order: 7
title:
  en-US: Reset filters and sorters
  zh-CN: 可控的筛选和排序
---

## zh-CN

使用受控属性对筛选和排序状态进行控制。

> 1. columns 中定义了 fileredValue 和 sortOrder 属性即视为受控模式。
> 2. 只支持同时对一列进行排序，请保证只有一列的 sortOrder 属性是生效的。
> 3. 务必指定 `column.key`。

## en-US

Control filters and sorters by `fileredValue` and `sortOrder`.

> 1. Defining `fileredValue` or `sortOrder` means that it is in the controlled mode.
> 2. Make sure `sortOrder` is assigned for only one column.
> 3. `column.key` is required.

````jsx
import { Table } from 'antd';

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
}, {
  key: '4',
  name: 'Jim Red',
  age: 32,
  address: 'London No. 2 Lake Park',
}];

const App = React.createClass({
  getInitialState() {
    return {
      filteredInfo: null,
      sortedInfo: null,
    };
  },
  handleChange(pagination, filters, sorter) {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  },
  clearFilters(e) {
    e.preventDefault();
    this.setState({ filteredInfo: null });
  },
  clearAll(e) {
    e.preventDefault();
    this.setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  },
  setAgeSort(e) {
    e.preventDefault();
    this.setState({
      sortedInfo: {
        order: 'descend',
        columnKey: 'age',
      },
    });
  },
  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      filters: [
        { text: 'Joe', value: 'Joe' },
        { text: 'Jim', value: 'Jim' },
      ],
      filteredValue: filteredInfo.name,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filters: [
        { text: 'London', value: 'London' },
        { text: 'New York', value: 'New York' },
      ],
      filteredValue: filteredInfo.address,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
    }];
    return (
      <div>
        <div className="table-operations">
          <a href="#" onClick={this.setAgeSort}>Age descending order</a>
          <a href="#" onClick={this.clearFilters}>Clear filters</a>
          <a href="#" onClick={this.clearAll}>Clear filters and sorting</a>
        </div>
        <Table columns={columns} dataSource={data} onChange={this.handleChange} />
      </div>
    );
  },
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
