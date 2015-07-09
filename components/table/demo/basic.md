# 基本用法

- order: 0

简单的表格。

---

````jsx
var Table = antd.Table;
var columns = [{
  title: '姓名',
  dataIndex: 'name'
}, {
  title: '年龄',
  dataIndex: 'age'
}, {
  title: '住址',
  dataIndex: 'address',
  render: function(text) {
    return <a href="#">{text}</a>;
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

React.render(<Table columns={columns} data={data} />
, document.getElementById('components-table-demo-basic'));
````
