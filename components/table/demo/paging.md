# 分页

- order: 5

数据项较多时显示分页。

---

````jsx
var Table = antd.Table;

var columns = [{
  title: '姓名',
  dataIndex: 'name',
  render: function(text) {
    return <a href="javascript:;">{text}</a>;
  }
}, {
  title: '年龄',
  dataIndex: 'age'
}, {
  title: '住址',
  dataIndex: 'address'
}];
var data = [];

for (let i=0; i<46; i++) {
  data.push({
    key: i,
    name: '李大嘴' + i,
    age: 32,
    address: '西湖区湖底公园' + i + '号'
  });
}

var pagination = {
  total: data.length,
  current: 2,
  showSizeChanger: true
};

ReactDOM.render(<Table columns={columns} dataSource={data} pagination={pagination} />
, document.getElementById('components-table-demo-paging'));
````
