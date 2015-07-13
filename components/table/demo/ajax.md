# 动态加载数据

- order: 4

`dataSource="/api/data.json"`，列表数据是远程读取的，并有 loading 效果。

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

function resolve(result) {
  console.log(this.loadData);
  return result.data;
}

React.render(<Table columns={columns} dataSource="/components/table/demo/data.json" resolve={resolve} />
, document.getElementById('components-table-demo-ajax'));
````
