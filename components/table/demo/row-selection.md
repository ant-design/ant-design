# 选择

- order: 1

第一列是联动的选择框。

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
  dataIndex: 'address',
  render: function(text) {
    return <a href="#">{text}</a>;
  }
}];
var data = [{
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}, {
  name: '胡彦祖',
  age: 42,
  address: '西湖区湖底公园1号'
}, {
  name: '李大嘴',
  age: 32,
  address: '西湖区湖底公园1号'
}];

// 通过 rowSelection 对象表明需要行选择
var rowSelection = {
  onSelect: function(record, selected) {
    console.log(record, selected);
  },
  onSelectAll: function(selected) {
    console.log(selected);
  }
};

React.render(<Table rowSelection={rowSelection} columns={columns} dataSource={data} />
, document.getElementById('components-table-demo-row-selection'));
````
