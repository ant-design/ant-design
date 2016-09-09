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
    width: 100,
    fixed: 'left',
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
        width: 100,
        sorter: (a, b) => a.age - b.age,
      },
      {
        title: '住址',
        children: [
          {
            title: '街道',
            dataIndex: 'street',
            key: 'street',
            width: 200,
          },
          {
            title: '小区',
            children: [
              {
                title: '单元',
                dataIndex: 'building',
                key: 'building',
                width: 50,
              },
              {
                title: '门牌',
                dataIndex: 'number',
                key: 'number',
                width: 100,
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
        width: 200,
      },
      {
        title: '名称',
        dataIndex: 'companyName',
        key: 'companyName',
        width: 200,
      },
    ],
  },
  {
    title: '性别',
    dataIndex: 'gender',
    key: 'gender',
    width: 60,
    fixed: 'right',
  },
];

const data = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    name: '胡彦祖',
    age: Math.ceil(Math.random() * 100),
    street: '拱墅区和睦街道',
    building: 3,
    number: 2035,
    companyAddress: '西湖区湖底公园',
    companyName: '湖底有限公司',
    gender: '男',
  });
}

ReactDOM.render(
  <Table
    columns={columns}
    dataSource={data}
    bordered size="middle"
    scroll={{ x: 1010, y: 240 }}
  />,
  mountNode
);
```
