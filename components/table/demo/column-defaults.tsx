import React from 'react';
import type { TableProps } from 'antd';
import { Table } from 'antd';

interface DataType {
  key: React.Key;
  name: string;
  address: string;
  description: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 140,
  },
  {
    title: 'Description',
    dataIndex: 'description',
    width: 180,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    align: 'left',
    width: 220,
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    description: 'Shared column props let repeated column settings live on the table.',
    address: 'No. 1 Lake Park Road, Hangzhou, Zhejiang, China',
  },
  {
    key: '2',
    name: 'Jim Green',
    description: 'Columns can still override the default alignment or other shared props.',
    address: 'No. 99 Garden Avenue, Pudong, Shanghai, China',
  },
];

const App: React.FC = () => (
  <Table<DataType>
    columns={columns}
    dataSource={data}
    column={{ align: 'center', ellipsis: true }}
    pagination={false}
  />
);

export default App;
