import React from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Alice White',
    age: 28,
    address: 'Tokyo No. 1 Lake Park',
  },
  {
    key: '5',
    name: 'Bob Wilson',
    age: 35,
    address: 'Paris No. 1 Lake Park',
  },
  {
    key: '6',
    name: 'Charlie Davis',
    age: 45,
    address: 'Berlin No. 1 Lake Park',
  },
  {
    key: '7',
    name: 'Diana Miller',
    age: 29,
    address: 'Seoul No. 1 Lake Park',
  },
  {
    key: '8',
    name: 'Edward Lee',
    age: 38,
    address: 'Beijing No. 1 Lake Park',
  },
  {
    key: '9',
    name: 'Fiona Clark',
    age: 31,
    address: 'Singapore No. 1 Lake Park',
  },
  {
    key: '10',
    name: 'George Wang',
    age: 27,
    address: 'Hong Kong No. 1 Lake Park',
  },
  {
    key: '11',
    name: 'Hannah Kim',
    age: 33,
    address: 'Toronto No. 1 Lake Park',
  },
  {
    key: '12',
    name: 'Ivan Chen',
    age: 41,
    address: 'Vancouver No. 1 Lake Park',
  },
  {
    key: '13',
    name: 'Julia Park',
    age: 26,
    address: 'Melbourne No. 1 Lake Park',
  },
  {
    key: '14',
    name: 'Kevin Zhang',
    age: 36,
    address: 'Dubai No. 1 Lake Park',
  },
  {
    key: '15',
    name: 'Laura Liu',
    age: 30,
    address: 'Mumbai No. 1 Lake Park',
  },
  {
    key: '16',
    name: 'Michael Tan',
    age: 44,
    address: 'Bangkok No. 1 Lake Park',
  },
  {
    key: '17',
    name: 'Nancy Wu',
    age: 25,
    address: 'Jakarta No. 1 Lake Park',
  },
  {
    key: '18',
    name: 'Oscar Huang',
    age: 39,
    address: 'Manila No. 1 Lake Park',
  },
  {
    key: '19',
    name: 'Patricia Lin',
    age: 34,
    address: 'Taipei No. 1 Lake Park',
  },
  {
    key: '20',
    name: 'Quinn Yang',
    age: 37,
    address: 'Osaka No. 1 Lake Park',
  },
];

const App: React.FC = () => (
  <Table<DataType>
    pagination={false}
    scroll={{ y: '400px' }}
    bordered
    showHeader={false}
    columns={columns}
    dataSource={data}
  />
);

export default App;
