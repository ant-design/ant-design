---
order: 29
title:
  en-US: Summary
  zh-CN: 总结栏
---

## zh-CN

通过 `summary` 设置总结栏。

## en-US

Set summary content by `summary` prop.

```jsx
import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Chinese Score',
    dataIndex: 'chinese',
  },
  {
    title: 'Math Score',
    dataIndex: 'math',
  },
  {
    title: 'English Score',
    dataIndex: 'english',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '2',
    name: 'Jim Green',
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    key: '3',
    name: 'Joe Black',
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    key: '4',
    name: 'Jim Red',
    chinese: 88,
    math: 99,
    english: 89,
  },
];

ReactDOM.render(
  <Table
    columns={columns}
    dataSource={data}
    pagination={false}
    summary={pageData => {
      let totalChinese = 0;
      let totalMath = 0;
      let totalEnglish = 0;

      pageData.forEach(({ chinese, math, english }) => {
        totalChinese += chinese;
        totalMath += math;
        totalEnglish += english;
      });

      return (
        <>
          <tr>
            <th>Total</th>
            <td colSpan={3} />
          </tr>
          <tr>
            <td />
            <td>{totalChinese}</td>
            <td>{totalMath}</td>
            <td>{totalEnglish}</td>
          </tr>
        </>
      );
    }}
  />,
  mountNode,
);
```
