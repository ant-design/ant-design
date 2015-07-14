# 动态加载数据

- order: 7

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
  return result.data;
}

var dataSource = {
  url: "/components/table/demo/data.json",
  resolve: function(result) {
    return result.data;
  },
  // 和后台接口返回的分页数据进行适配
  getPagination: function(result) {
    return {
      total: result.totalCount,
      pageSize: result.pageSize
    }
  }
};

React.render(<Table columns={columns} dataSource={dataSource} />
, document.getElementById('components-table-demo-ajax'));
````
