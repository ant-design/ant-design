import React from 'react';
import { Space, Table, Typography } from 'antd';
import type { TableProps } from 'antd';

interface RecordType {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  address1: string;
  address2: string;
  address3: string;
}

const columns: TableProps<RecordType>['columns'] = [
  {
    title: 'ID',
    dataIndex: 'id',
    width: 100,
    fixed: 'left',
  },
  {
    title: 'FistName',
    dataIndex: 'firstName',
    width: 120,
    fixed: 'left',
  },
  {
    title: 'LastName',
    dataIndex: 'lastName',
    width: 120,
    fixed: 'left',
  },
  {
    title: 'Group',
    width: 120,
    render: (_, record) => `Group ${Math.floor(record.id / 4)}`,
    onCell: (record) => ({
      rowSpan: record.id % 4 === 0 ? 4 : 0,
    }),
  },
  {
    title: 'Age',
    dataIndex: 'age',
    width: 100,
  },
  {
    title: 'Address 1',
    dataIndex: 'address1',
  },
  {
    title: 'Address 2',
    dataIndex: 'address2',
  },
  {
    title: 'Address 3',
    dataIndex: 'address3',
  },
  {
    title: 'Action',
    width: 150,
    fixed: 'right',
    render: () => (
      <Space>
        <Typography.Link>Action1</Typography.Link>
        <Typography.Link>Action2</Typography.Link>
      </Space>
    ),
  },
];

const data: RecordType[] = new Array(10000).fill(null).map((_, index) => ({
  id: index,
  firstName: `First_${index.toString(16)}`,
  lastName: `Last_${index.toString(16)}`,
  age: 25 + (index % 10),
  address1: `New York No. ${index} Lake Park`,
  address2: `London No. ${index} Lake Park`,
  address3: `Sydney No. ${index} Lake Park`,
}));

const App = () => (
  <Table
    bordered
    virtual
    columns={columns}
    scroll={{ x: 2500, y: 400 }}
    rowKey="id"
    dataSource={data}
    pagination={false}
  />
);

export default App;
