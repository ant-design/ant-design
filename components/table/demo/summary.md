---
order: 29
title:
  en-US: Summary
  zh-CN: 总结栏
---

## zh-CN

通过 `summary` 设置总结栏。使用 `Table.Summary.Cell` 同步 Column 的固定状态。

## en-US

Set summary content by `summary` prop. Sync column fixed status with `Table.Summary.Cell`.

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

const fixedColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    fixed: true,
    width: 100,
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
];

const fixedData = [];
for (let i = 0; i < 6; i += 1) {
  fixedData.push({
    key: i,
    name: i % 2 ? 'Light' : 'Bamboo',
    description: 'Everything that has a beginning, has an end.',
  });
}

ReactDOM.render(
  <>
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
            <Table.Summary.Row>
              <Table.Summary.Cell>Total</Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text type="danger">{totalBorrow}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell>
                <Text>{totalRepayment}</Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
            <Table.Summary.Row>
              <Table.Summary.Cell>Balance</Table.Summary.Cell>
              <Table.Summary.Cell colSpan={2}>
                <Text type="danger">{totalBorrow - totalRepayment}</Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </>
        );
      }}
    />

    <br />

    <Table
      columns={fixedColumns}
      dataSource={fixedData}
      pagination={false}
      scroll={{ x: 2000 }}
      bordered
      summary={() => (
        <Table.Summary.Row>
          <Table.Summary.Cell index={0}>Summary</Table.Summary.Cell>
          <Table.Summary.Cell index={1}>This is a summary content</Table.Summary.Cell>
        </Table.Summary.Row>
      )}
    />
  </>,
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
