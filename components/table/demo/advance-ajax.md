# 外界触发表格刷新

- order: 8

查询页面大量使用表格，当删除某条目后需要刷新。可直接传入DataSource实例，然后调用其fetch方法刷新表格。

**注意，请打开console调试fetch方法**

---

````jsx
var Table = antd.Table;
var DataSource = Table.DataSource;

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

var dataSource = new DataSource({
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
  // 和后台接口接收的参数进行适配
  // 参数里提供了分页、筛选、排序的信息
  getParams: function(pagination, filters, sorter) {
    console.log('getParams 的参数是：', pagination, filters, sorter);
    var params = {
      pageSize: pagination.pageSize,
      currentPage: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order
    };
    for (let key in filters) {
      params[key] = filters[key];
    }
    console.log('请求参数：', params);
    return params;
  }
});

// 可供外部调用fetch接口刷新表格
dataSource.fetch();

// 请打开console调试fetch方法
window.dataSource = dataSource;

React.render(<Table columns={columns} dataSource={dataSource} />
, document.getElementById('components-table-demo-advance-ajax'));
````
