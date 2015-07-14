# 动态加载数据

- order: 7

远程读取的表格是**更为常见的模式**，下面的表格使用了 `dataSource` 对象和远程数据源绑定和适配，并具有筛选、排序等功能以及页面 loading 效果。

---

````jsx
var Table = antd.Table;
var columns = [{
  title: '姓名',
  dataIndex: 'name',
  filters: [{
    text: '姓李的',
    value: '李'
  }, {
    text: '姓胡的',
    value: '胡'
  }]
}, {
  title: '年龄',
  dataIndex: 'age',
  sorter: true
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
  },
  getParams: function(pagination, filters, sorters) {
    let params = {};
    console.log(pagination, filters, sorters);
    return params;
  }
};

React.render(<Table columns={columns} dataSource={dataSource} />
, document.getElementById('components-table-demo-ajax'));
````
