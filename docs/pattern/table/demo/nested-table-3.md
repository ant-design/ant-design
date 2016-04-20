---
order: 3
title: 嵌入列表示例 3
---

适用表格中有嵌套的子表格时。

1.将 dataSource 中的 subTable 字段设置为 true，告诉组件渲染嵌套表格

2.本例子将演示通过异步的方式获取嵌套的表格数据。

````jsx
import { Table } from 'antd';

const data = [
  {
    key: 1,
    id: 11,
    name: '吴彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
    description: '我是吴彦祖，今年42岁，住在西湖区湖底公园1号。',
    subTable: true
  },
  {
    key: 2,
    id: 22,
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园2号',
    description: '我是胡彦斌，今年32岁，住在西湖区湖底公园2号。'
  },
  {
    key: 3,
    id: 33,
    name: '李大嘴',
    age: 32,
    address: '西湖区湖底公园3号',
    description: '我是李大嘴，今年32岁，住在西湖区湖底公园3号。'
  }
];

class NestedTable extends React.Component {
  constructor(props) {
    super(props);

    // 缓存嵌套表格的数据
    this.state = {
      recordSubTableDataMap: {},
    };

    // 在 constructor 中绑定 `this` 到 handler 上，确保 `this` 的指向。
    ['handleExpandedRowRender'].forEach((method) => {
      this[method] = this[method].bind(this);
    });

    // columns 在 constructor 中初始化，保证 `column.render` 可以访问 `this`，同时不会重复生成。
    this.columns = [
      { title: '姓名', dataIndex: 'name', key: 'name' },
      { title: '年龄', dataIndex: 'age', key: 'age' },
      { title: '住址', dataIndex: 'address', key: 'address' },
      { title: '操作', dataIndex: '', key: 'x', render: () => <a href="#">删除</a> }
    ];

    // 嵌套子表格的 columns
    this.subTableColumns = [
      { title: '姓名', dataIndex: 'name', key: 'name' },
      { title: '年龄', dataIndex: 'age', key: 'age' },
      { title: '性别', dataIndex: 'sex', key: 'sex' },
      { title: '爱好', dataIndex: 'hobby', key: 'hobby' },
      { title: '住址', dataIndex: 'address', key: 'address' }
    ];
  }

  handleExpandedRowRender(record) {
    if (record.subTable) {
      const recordSubTableData = this.state.recordSubTableDataMap[record.id];

      if (recordSubTableData) {
        return (
          <Table
            columns={this.subTableColumns}
            dataSource={recordSubTableData.dataSource}
            pagination={false}
            className="nested-table"
            bordered />
        );
      }

      // 模拟 Ajax 请求，1 秒后返回嵌套表格的数据
      this.getSelectedRecordSubTableData(record);

      return (
        <p>加载中...</p>
      );
    }

    return (
      <p>{record.description}</p>
    );
  }

  getSelectedRecordSubTableData(record) {
    const recordId = record.id;

    // 模拟嵌套子表格的 dataSource
    const mockSubTableDataSource = [
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
    ];

    setTimeout(() => {
      this.setState({
        recordSubTableDataMap: {
          ...this.state.recordSubTableDataMap,
          [recordId]: {
            dataSource: mockSubTableDataSource
          }
        }
      });
    }, 1000);
  }

  render() {
    const props = this.props;

    return (
      <Table columns={this.columns}
        dataSource={props.dataSource}
        expandedRowRender={this.handleExpandedRowRender} />
    );
  }
}

NestedTable.propTypes = {
  dataSource: React.PropTypes.arrayOf(React.PropTypes.object),
};

ReactDOM.render(<NestedTable dataSource={data} />, mountNode);
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
