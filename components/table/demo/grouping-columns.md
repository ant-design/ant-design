---
order: 20
title:
  en-US: Grouping table head
  zh-CN: 表头分组
---

## zh-CN

`columns[n]` 可以内嵌 `children`，以渲染分组表头。

## en-US

Group table head with `columns[n].children`。

```jsx
import { Table } from 'antd';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    filters: [{
      text: '姓李的',
      value: '李',
    }, {
      text: '姓胡的',
      value: '胡',
    }],
    onFilter: (value, record) => record.name.indexOf(value) === 0,
  },
  {
    title: '其它',
    children: [
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: '住址',
        children: [
          {
            title: '街道',
            dataIndex: 'street',
            key: 'street',
          },
          {
            title: '小区',
            children: [
              {
                title: '单元',
                dataIndex: 'building',
                key: 'building',
              },
              {
                title: '门牌',
                dataIndex: 'number',
                key: 'number',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    title: '公司',
    children: [
      {
        title: '地址',
        dataIndex: 'companyAddress',
        key: 'companyAddress',
      },
      {
        title: '名称',
        dataIndex: 'companyName',
        key: 'companyName',
      },
    ],
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
  },
];

const rowSelection = {
  onChange(selectedRowKeys, selectedRows) {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect(record, selected, selectedRows) {
    console.log(record, selected, selectedRows);
  },
  onSelectAll(selected, selectedRows, changeRows) {
    console.log(selected, selectedRows, changeRows);
  },
};

const data = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  street: '拱墅区和睦街道',
  building: 1,
  number: 2033,
  companyAddress: '西湖区湖底公园',
  companyName: '湖底有限公司',
  gender: '男',
}, {
  key: '2',
  name: '胡彦祖',
  age: 42,
  street: '拱墅区和睦街道',
  building: 3,
  number: 2035,
  companyAddress: '西湖区湖底公园',
  companyName: '湖底有限公司',
  gender: '男',
}];

ReactDOM.render(
  <Table
    columns={columns}
    rowSelection={rowSelection}
    dataSource={data}
    bordered size="middle"
  />,
  mountNode
);
```
