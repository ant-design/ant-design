# 小型列表

- order: 9

`size="small"`, 用在对话框等空间较小的地方。

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
  dataIndex: 'address'
}];
var data = [{
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

React.render(<Table columns={columns} dataSource={data} size="small" />
, document.getElementById('components-table-demo-small'));
````
