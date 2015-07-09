# 基本用法

- order: 0

标准的表格。

---

````jsx
var Table = antd.Table;
var columns = [{
  title: '姓名',
  dataIndex: 'name'
}, {
  title: '年龄',
  dataIndex: 'age'
}];
var data = [{
  name: '胡彦斌',
  age: 32
}, {
  name: '胡彦祖',
  age: 42
}, {
  name: '李大嘴',
  age: 32
}];

React.render(<Table columns={columns} data={data} />
, document.getElementById('components-table-demo-basic'));
````
