# 国际化

- hidden: true

用 `locale` 设置表格的排序、过滤按钮的文字或 `title`。

---

````jsx
import { Table } from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  filters: [{
    text: 'Starts with A',
    value: '^[aA]'
  }, {
    text: 'Starts with B',
    value: '^[bB]'
  }],
  onFilter: function(value, record) {
    return new RegExp(value).test(record.name);
  },
}, {
  title: 'Age',
  dataIndex: 'age',
  sorter: function(a, b) {
    return a.age - b.age;
  }
}, {
  title: 'Address',
  dataIndex: 'address'
}];

const data = [{
  key: '1',
  name: 'Alice',
  age: 32,
  address: 'Somewhere'
}, {
  key: '2',
  name: 'Bob',
  age: 42,
  address: 'Somewhere'
}, {
  key: '3',
  name: 'Candy',
  age: 32,
  address: 'Somewhere'
}];

const locale = {
  filterTitle: 'Filter',
  filterConfirm: 'Confirm',
  filterReset: 'Reset',
  emptyText: 'No Data',
};

ReactDOM.render(
  <Table columns={columns} dataSource={data} locale={locale} />,
  document.getElementById('components-table-demo-locale')
);
````
