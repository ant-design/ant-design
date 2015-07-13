# 筛选

- order: 6

对某一列数据进行筛选。

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
  onFilter: function(key) {
    console.log(key);
    this.fetch(this.props.dataSource + '?age=' + key);
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
