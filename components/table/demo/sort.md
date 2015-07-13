# 排序和筛选

- order: 5

按某一列对列表进行排序和筛选。

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
      text: '选项一'
      value: 'value1'
    }, {
      text: '选项二'
      value: 'value2'
    }];
  },
  onFilter: function(item) {
    this.props.dataSource += '?age=' + item.value;
    this.loadData();
  },
  onSorter: function(a, b) {
    return a > b;
  }
}, {
  title: '地址',
  dataIndex: 'address'
}];
var data = [{
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}];

React.render(<Table columns={columns} data={data} />
, document.getElementById('components-table-demo-sort'));
````
