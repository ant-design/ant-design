import React from 'react';
import { Table } from 'antd';
import type { TableColumnsType } from 'antd';

interface DataType {
  key: React.Key;
  team: string;
  name: string;
  age: number;
  address: string;
  description: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Team',
    dataIndex: 'team',
    key: 'team',
    onCell: (__, index = 0) => (index % 2 === 0 ? { rowSpan: 2 } : { rowSpan: 0 }),
    width: 100,
  },
  Table.EXPAND_COLUMN,
  { title: 'Name', dataIndex: 'name', key: 'name', width: 150 },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  {
    title: 'Action',
    dataIndex: '',
    key: 'x',
    render: () => <a>Delete</a>,
  },
];

const data: DataType[] = [
  {
    key: 1,
    team: 'Team A',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
  },
  {
    key: 2,
    team: 'Team A',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    team: 'Team B',
    name: 'Not Expandable',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
  },
  {
    key: 4,
    team: 'Team B',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    description: 'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
];

const App: React.FC = () => (
  <Table<DataType>
    bordered
    columns={columns}
    expandable={{
      expandedRowOffset: 3,
      expandedRowRender: (record) => <div>{record.description}</div>,
    }}
    dataSource={data}
  />
);

export default App;
