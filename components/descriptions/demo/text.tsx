import React from 'react';
import { Badge, Descriptions, Table } from 'antd';
import type { DescriptionsProps } from 'antd';

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'Product',
    children: 'Cloud Database',
  },
  {
    key: '2',
    label: <div style={{ display: 'flex' }}>Billing Mode</div>,
    children: 'Prepaid',
  },
  {
    key: '3',
    label: 'Automatic Renewal',
    children: 'YES',
  },
  {
    key: '4',
    label: 'Order time',
    children: '2018-04-24 18:00:00',
  },
  {
    key: '5',
    label: 'Usage Time',
    span: 2,
    children: '2019-04-24 18:00:00',
  },
  {
    key: '6',
    label: 'Status',
    span: 3,
    children: <Badge status="processing" text="Running" />,
  },
  {
    key: '7',
    label: 'Negotiated Amount',
    children: '$80.00',
  },
  {
    key: '8',
    label: 'Discount',
    children: '$20.00',
  },
  {
    key: '9',
    label: 'Official Receipts',
    children: '$60.00',
  },
  {
    key: '10',
    label: 'Config Info',
    children: (
      <>
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
        <br />
        Storage space: 10 GB
        <br />
        Replication factor: 3
        <br />
        Region: East China 1
        <br />
      </>
    ),
  },
  {
    key: '11',
    label: 'Official Receipts',
    children: '$60.00',
  },
  {
    key: '12',
    label: 'Config Info',
    children: <Table size="small" pagination={false} dataSource={dataSource} columns={columns} />,
  },
];

const App: React.FC = () => <Descriptions title="User Info" column={2} items={items} />;

export default App;
