# 可展开

- order: 12

当表格内容较多不能一次性完全展示时。

---

````jsx
var Table = antd.Table;

function renderAction() {
  return <a href="javascript:;">删除</a>;
}

function expandedRowRender(record) {
  return <p>{record.description}</p>;
}

var columns = [
  {title: '姓名', dataIndex: 'name', key: 'name'},
  {title: '年龄', dataIndex: 'age', key: 'age'},
  {title: '住址', dataIndex: 'address', key: 'address'},
  {title: '操作', dataIndex: '', key: 'x', render: renderAction}
];

var data = [
  {name: '胡彦斌', age: 32, address: '西湖区湖底公园1号', description: '我是胡彦斌，今年32岁，住在西湖区湖底公园1号。'},
  {name: '吴彦祖', age: 42, address: '西湖区湖底公园2号', description: '我是吴彦祖，今年42岁，住在西湖区湖底公园2号。'},
  {name: '李大嘴', age: 32, address: '西湖区湖底公园3号', description: '我是李大嘴，今年32岁，住在西湖区湖底公园3号。'}
];

React.render(
<Table columns={columns}
  expandedRowRender={expandedRowRender}
  dataSource={data}
  className="table" />
, document.getElementById('components-table-demo-expand'));
````
