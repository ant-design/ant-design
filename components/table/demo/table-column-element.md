---
order: 19
title: 使用TableColumn
---

提供TableColumn语法糖，让你编写的代码更具React-style

````jsx
import { Table, Icon } from 'antd';
const TableColumn = Table.Column;

const data = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号',
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号',
}, {
  key: '3',
  name: '李大嘴',
  age: 32,
  address: '西湖区湖底公园1号',
}];

function renderOperator(text, record) {
  return (
    <span>
      <a href="#">操作一{record.name}</a>
      <span className="ant-divider"></span>
      <a href="#">操作二</a>
      <span className="ant-divider"></span>
      <a href="#" className="ant-dropdown-link">
        更多 <Icon type="down" />
      </a>
    </span>
  );
}

ReactDOM.render(<div>
  <Table dataSource={data} size="middle">
    <TableColumn title="姓名" dataIndex="name" render={text => <a href="#">{text}</a>} />
    <TableColumn title="年龄" dataIndex="age" />
    <TableColumn title="住址" dataIndex="address" />
    <TableColumn title="操作" render={renderOperator} />
  </Table>
</div>, mountNode);
````