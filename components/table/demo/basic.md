# 基本用法

- order: 0

简单的表格，最后一列是各种操作。

---

````jsx
import { Table, Icon } from 'antd';

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  render: function(text) {
    return <a href="javascript:;">{text}</a>;
  }
}, {
  title: '年龄',
  dataIndex: 'age'
}, {
  title: '住址',
  dataIndex: 'address'
}, {
  title: '操作',
  dataIndex: '',
  render: function(text, record) {
    return <span>
      <a href="javascript:;">操作一</a>
      <span className="ant-divider"></span>
      <a href="javascript:;">操作二</a>
      <span className="ant-divider"></span>
      <a href="javascript:;" className="ant-dropdown-link">
        更多 <Icon type="down" />
      </a>
    </span>;
  }
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

ReactDOM.render(<Table columns={columns} dataSource={data} />
, document.getElementById('components-table-demo-basic'));
````
