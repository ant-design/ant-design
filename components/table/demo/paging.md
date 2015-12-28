# 分页

- order: 5

数据项较多时显示分页。

---

````jsx
import { Table } from 'antd';

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  render: function(text) {
    return <a href="#">{text}</a>;
  }
}, {
  title: '年龄',
  dataIndex: 'age'
}, {
  title: '住址',
  dataIndex: 'address'
}];

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: '李大嘴' + i,
    age: 32,
    address: '西湖区湖底公园' + i + '号'
  });
}

const pagination = {
  total: data.length,
  current: 1,
  showSizeChanger: true,
  onShowSizeChange: function(current, pageSize) {
    console.log('Current: ', current, '; PageSize: ', pageSize);
  }
};

ReactDOM.render(<Table columns={columns} dataSource={data} pagination={pagination} />
, document.getElementById('components-table-demo-paging'));
````
