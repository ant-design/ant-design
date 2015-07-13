# 筛选

- order: 6

对某一列数据进行筛选，使用列的 `filter` 属性来指定筛选的列表，`onFilter` 方法指定选择后的回调。一般是向服务器请求筛选后的数据。

---

````jsx
var Table = antd.Table;
var columns = [{
  title: '姓名',
  dataIndex: 'name'
}, {
  title: '年龄',
  dataIndex: 'age',
  filter: function() {
    return [{
      text: '选项一',
      value: 'value1'
    }, {
      text: '选项二',
      value: 'value2'
    }];
  },
  onFilter: function(filters) {
    console.log(filters);
    // 向服务器请求新数据
    this.fetch(this.props.dataSource + '?age=' + filters.join(','));
  }
}, {
  title: '地址',
  dataIndex: 'address'
}];

function resolve(result) {
  return result.data;
}

React.render(<Table columns={columns} dataSource="/components/table/demo/data.json" resolve={resolve} />
, document.getElementById('components-table-demo-filter'));
````
