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
import { Table, Typography } from 'antd';

const { Text } = Typography;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Borrow',
    dataIndex: 'borrow',
  },
  {
    title: 'Repayment',
    dataIndex: 'repayment',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    borrow: 10,
    repayment: 33,
  },
  {
    key: '2',
    name: 'Jim Green',
    borrow: 100,
    repayment: 0,
  },
  {
    key: '3',
    name: 'Joe Black',
    borrow: 10,
    repayment: 10,
  },
  {
    key: '4',
    name: 'Jim Red',
    borrow: 75,
    repayment: 45,
  },
];

ReactDOM.render(
  <Table
    columns={columns}
    dataSource={data}
    pagination={false}
    bordered
    summary={pageData => {
      let totalBorrow = 0;
      let totalRepayment = 0;

      pageData.forEach(({ borrow, repayment }) => {
        totalBorrow += borrow;
        totalRepayment += repayment;
      });

      return (
        <>
          <tr>
            <th>Total</th>
            <td>
              <Text type="danger">{totalBorrow}</Text>
            </td>
            <td>
              <Text>{totalRepayment}</Text>
            </td>
          </tr>
          <tr>
            <th>Balance</th>
            <td colSpan={2}>
              <Text type="danger">{totalBorrow - totalRepayment}</Text>
            </td>
          </tr>
        </>
      );
    }}
  />,
  mountNode,
);
```

<style>
  #components-table-demo-summary tfoot th,
  #components-table-demo-summary tfoot td {
    background: #fafafa;
  }
  [data-theme="dark"] #components-table-demo-summary tfoot th,
  [data-theme="dark"] #components-table-demo-summary tfoot td {
    background: #1d1d1d;
  }
</style>
