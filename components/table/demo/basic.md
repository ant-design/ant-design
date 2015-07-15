# 基本用法

- order: 0

简单的表格，最后一列是各种操作。

---

````jsx
var Table = antd.Table;
var columns = [{
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
}, {
  title: '操作',
  dataIndex: '',
  render: function(text, record) {
    return <span>
      <a href="#">删除</a>
      <span className="ant-divider">|</span>
      <a href="#">操作</a>
      <span className="ant-divider">|</span>
      <a href="#" className="ant-dropdown-link">
        更多 <i className="anticon anticon-down"></i>
      </a>
    </span>;
  }
}];
var data = [{
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}, {
  name: '李大嘴',
  age: 32,
  address: '西湖区湖底公园1号'
}];

React.render(<Table columns={columns} dataSource={data} />
, document.getElementById('components-table-demo-basic'));
````
