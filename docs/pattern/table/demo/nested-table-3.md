---
order: 3
title: 嵌入列表示例 3
---

适用表格中有嵌套的子表格时。

1.在 table 字段设置嵌套表格的数据，同父级表格一样，需要有 columns 和 dataSource。

````jsx
import { Table } from 'antd';

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '住址', dataIndex: 'address', key: 'address' },
  { title: '操作', dataIndex: '', key: 'x', render: () => <a href="#">删除</a> }
];

const data = [
  {
    key: 1,
    name: '吴彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
    description: '我是吴彦祖，今年42岁，住在西湖区湖底公园1号。',
    table: {
      columns: [
        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '年龄', dataIndex: 'age', key: 'age' },
        { title: '性别', dataIndex: 'sex', key: 'sex' },
        { title: '爱好', dataIndex: 'hobby', key: 'hobby' },
        { title: '住址', dataIndex: 'address', key: 'address' }
      ],
      dataSource: [
        {
          key: 11,
          name: '小吴',
          age: 21,
          sex: '男',
          hobby: '女',
          address: '我是小吴，今年21岁，住在东极岛。'
        },
        {
          key: 44,
          name: '小彦',
          age: 25,
          sex: '男',
          hobby: '女',
          address: '我是小彦，今年25岁，住在南极岛。'
        },
        {
          key: 33,
          name: '小祖',
          age: 28,
          sex: '男',
          hobby: '女',
          address: '我是小祖，今年28岁，住在北极岛。'
        }
      ]
    }
  },
  {
    key: 2,
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园2号',
    description: '我是胡彦斌，今年32岁，住在西湖区湖底公园2号。'
  },
  {
    key: 3,
    name: '李大嘴',
    age: 32,
    address: '西湖区湖底公园3号',
    description: '我是李大嘴，今年32岁，住在西湖区湖底公园3号。'
  }
];

const App = React.createClass({
  expandedRowRender(record) {
    if (record.table) {
      return (
        <div>
          <Table
            columns={record.table.columns}
            dataSource={record.table.dataSource}
            pagination={false}
            className="nested-table"
            bordered />
        </div>
      );
    }

    return (
      <p>{record.description}</p>
    );
  },
  render() {
    return (
      <Table columns={columns}
        expandedRowRender={record => this.expandedRowRender(record)}
        dataSource={data}
        className="table" />
    );
  }
});

ReactDOM.render(<App />, mountNode);
````

````css
.ant-table.nested-table {
  position: relative;
  margin: -17px -8px -16px -42px;
  background: #fbfbfb;
  border-radius: initial;
}
.ant-table.nested-table table {
  border: none;
}
.ant-table.nested-table th {
  padding: 8px;
  border-bottom: 1px dashed #ddd;
  border-right: 1px dashed #ddd;
  background: none;
  font-weight: normal;
}
.ant-table.nested-table th:first-child {
  padding-left: 42px;
}
.ant-table.nested-table td {
  padding: 8px;
  border-bottom: 1px dashed #ddd;
  border-right: 1px dashed #ddd;
}
.ant-table.nested-table td:first-child {
  padding-left: 42px;
}
````
