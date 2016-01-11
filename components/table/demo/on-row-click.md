# 行点击事件

- order: 17
- hidden: true

通过传入 `onRowClick` 处理表格行点击事件，函数的两个参数为 `record` 和 `index`，`index` 代表当前行在其兄弟节点中的次序

---

````jsx
import { Table } from 'antd';

const onRowClick = function(record, index) {
  alert(`u click the nth(${index}) element of yourFather.children, record.name: ${record.name}`);
};

const onOperationClick = function(text, record) {
  alert(`u click ${text}, record.name is ${record.name}`);
};

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
  render: (text, record) => <a href="#" onClick={onOperationClick.bind(null, text, record)}>Alert: {text}, click will pop to row click</a>,
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
}];

const data = [{
  key: 1,
  name: 'a',
  age: 32,
  address: '我是a',
  children: [{
    key: 11,
    name: 'aa',
    age: 33,
    address: '我是aa',
  }, {
    key: 12,
    name: 'ab',
    age: 33,
    address: '我是ab',
    children: [{
      key: 121,
      name: 'aba',
      age: 33,
      address: '我是aba',
    }],
  }, {
    key: 13,
    name: 'ac',
    age: 33,
    address: '我是ac',
    children: [{
      key: 131,
      name: 'aca',
      age: 33,
      address: '我是aca',
      children: [{
        key: 1311,
        name: 'acaa',
        age: 33,
        address: '我是acaa',
      }, {
        key: 1312,
        name: 'acab',
        age: 33,
        address: '我是acab',
      }],
    }],
  }],
}, {
  key: 2,
  name: 'b',
  age: 32,
  address: '我是b',
}];

ReactDOM.render(
  <Table columns={columns} dataSource={data} onRowClick={onRowClick} />,
  mountNode
);
````
