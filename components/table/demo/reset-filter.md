---
order: 6
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

Controll filters and sorters by `fileredValue` and `sortOrder`.

> 1. Defining `fileredValue` or `sortOrder` means that it is in the controlled mode.

> 2. Make sure `sortOrder` is assigned for only one column.

> 3. `column.key` is required.

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
      filteredInfo: null,
      sortedInfo: null,
    };
  },
  handleChange(pagination, filters, sorter) {
    console.log('各类参数是', pagination, filters, sorter);
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
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      filters: [
        { text: '姓李的', value: '李' },
        { text: '姓胡的', value: '胡' },
      ],
      filteredValue: filteredInfo.name,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
    }, {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
    }, {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      filters: [
        { text: '南湖', value: '南湖' },
        { text: '西湖', value: '西湖' },
      ],
      filteredValue: filteredInfo.address,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.length - b.address.length,
      sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
    }];
    return (
      <div>
        <div className="table-operations">
          <a href="#" onClick={this.setAgeSort}>年龄降序排序</a>
          <a href="#" onClick={this.clearFilters}>清除筛选</a>
          <a href="#" onClick={this.clearAll}>清除筛选和排序</a>
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
