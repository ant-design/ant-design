# 排序

- order: 5

对某一列数据进行排序，通过指定列的 `sorter` 函数即可启动排序按钮。支持前台排序和后台排序，后台排序会发送请求。

`sorter: function(order) { ... }`， order 为排序方向：升序 `ascend`、降序 `descend` 或空字符串。

---

````jsx
var Table = antd.Table;
var columns = [{
  title: '姓名(后端排序)',
  dataIndex: 'name',
  sorter: function(order) {
    this.fetch(this.props.dataSource + (order && '?sort=name&order=' + order));
  }
}, {
  title: '年龄(前端排序)',
  dataIndex: 'age',
  sorter: function(order) {
    if (!order) {
      return;
    }
    this.state.data = this.state.data.sort(function(a, b) {
      return (order === 'ascend') ?
        (a.age - b.age) : (b.age - a.age);
    });
    this.setState({
      data: this.state.data
    });
  }
}, {
  title: '地址',
  dataIndex: 'address'
}];

function resolve(result) {
  return result.data;
}

React.render(<Table columns={columns} dataSource="/components/table/demo/data.json" resolve={resolve} />
, document.getElementById('components-table-demo-sort'));
````
