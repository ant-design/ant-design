# 单选

- order: 4

配置单选框的默认属性。

---

````jsx
import { Table } from 'antd';

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
  id: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  id: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}, {
  id: '3',
  name: '李大嘴',
  age: 32,
  address: '西湖区湖底公园1号'
}];

// 通过 rowSelection 对象表明需要行选择
const rowSelection = {
  type: 'radio',
  getCheckboxProps: function(record) {
    return {
      defaultChecked: record.name === '李大嘴', // 配置默认勾选的列
      disabled: record.name === '胡彦祖'    // 配置无法勾选的列
    };
  },
  onSelect: function(record, selected, selectedRows) {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: function(selected, selectedRows) {
    console.log(selected, selectedRows);
  }
};

function rowKey(record) {
  return record.id;
}

ReactDOM.render(<Table rowSelection={rowSelection} rowKey={rowKey} columns={columns} dataSource={data} />
, document.getElementById('components-table-demo-row-selection-radio-props'));
````
