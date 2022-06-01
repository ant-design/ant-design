---
order: 29
title:
  en-US: Summary
  zh-CN: 总结栏
---

## zh-CN

通过 `summary` 设置总结栏。使用 `Table.Summary.Cell` 同步 Column 的固定状态。你可以通过配置 `Table.Summary` 的 `fixed` 属性使其固定(`4.16.0` 支持)。

## en-US

Set summary content by `summary` prop. Sync column fixed status with `Table.Summary.Cell`. You can fixed it by set `Table.Summary` `fixed` prop(since `4.16.0`).

```tsx
import { Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import React from 'react';

const { Text } = Typography;

interface DataType {
  key: string;
  name: string;
  borrow: number;
  repayment: number;
}

interface FixedDataType {
  key: React.Key;
  name: string;
  description: string;
}

const columns: ColumnsType<DataType> = [
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

const data: DataType[] = [
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

const fixedColumns: ColumnsType<FixedDataType> = [
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

const fixedData: FixedDataType[] = [];
for (let i = 0; i < 20; i += 1) {
  fixedData.push({
    key: i,
    name: ['Light', 'Bamboo', 'Little'][i % 3],
    description: 'Everything that has a beginning, has an end.',
  });
}

const App: React.FC = () => (
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
              <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
              <Table.Summary.Cell index={1}>
                <Text type="danger">{totalBorrow}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2}>
                <Text>{totalRepayment}</Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0}>Balance</Table.Summary.Cell>
              <Table.Summary.Cell index={1} colSpan={2}>
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
      scroll={{ x: 2000, y: 500 }}
      bordered
      summary={() => (
        <Table.Summary fixed>
          <Table.Summary.Row>
            <Table.Summary.Cell index={0}>Summary</Table.Summary.Cell>
            <Table.Summary.Cell index={1}>This is a summary content</Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      )}
    />
  </>
);

export default App;
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
