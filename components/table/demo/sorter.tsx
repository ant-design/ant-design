import React, { useState } from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    key: 'name',
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },
  { key: 'age', title: 'Age', dataIndex: ['age'], sorter: (a, b) => a.age - b.age },
  { key: 'address', title: 'Address', dataIndex: 'address' },
];

const data: DataType[] = [
  { key: '1', name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park' },
  { key: '2', name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park' },
  { key: '3', name: 'Joe Black', age: 33, address: 'Sydney No. 1 Lake Park' },
];

const App: React.FC = () => {
  const [sorter, setSorter] = useState<TableProps['sorter']>({ dataIndex: 'age', order: 'ascend' });

  return (
    <Table
      columns={columns}
      dataSource={data}
      sorter={sorter}
      onChange={(pagination, filters, tableSorter) => {
        if (!Array.isArray(tableSorter)) {
          setSorter({ dataIndex: tableSorter.columnKey, order: tableSorter.order });
        }
      }}
    />
  );
};

export default App;
