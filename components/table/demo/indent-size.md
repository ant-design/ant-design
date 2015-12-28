# 树形数据展示

- order: 16

表格支持树形数据的展示，可以通过设置 `indentSize` 以控制每一层的缩进宽度。

---

````jsx
import { Table } from 'antd';

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
  width: '40%',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
  width: '30%',
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
  width: '30%',
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
  <Table columns={columns} dataSource={data} indentSize={30} />,
  document.getElementById('components-table-demo-indent-size')
);
````
