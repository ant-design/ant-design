# 筛选和排序

- order: 3

对某一列数据进行筛选，使用列的 `filter` 属性来指定筛选的列表。

对某一列数据进行排序，通过指定列的 `sorter` 函数即可启动排序按钮。`sorter: function(a, b) { ... }`， a、b 为比较的两个列数据。

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
  }],
  // 指定确定筛选的条件函数
  // 这里是名字中第一个字是 value
  onFilter: function(value, record) {
    return record.name.indexOf(value) === 0;
  },
  sorter: function(a, b) {
    return a.name.length - b.name.length;
  }
}, {
  title: '年龄',
  dataIndex: 'age',
  sorter: function(a, b) {
    return a.age - b.age;
  }
}, {
  title: '地址',
  dataIndex: 'address',
  sorter: function(a, b) {
    return a.address.length - b.address.length;
  }
}];

var data = [{
  name: '胡斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园12号'
}, {
  name: '李大嘴',
  age: 32,
  address: '西湖区湖底公园123号'
}, {
  name: '李秀莲大嘴哥',
  age: 32,
  address: '西湖区湖底公园123号'
}];

React.render(<Table columns={columns} dataSource={data} />
, document.getElementById('components-table-demo-head'));
````
