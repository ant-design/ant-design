import React, { useState } from 'react';
import { Space, Switch, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface DataType {
  key: React.ReactNode;
  name: string;
  age: number;
  address: string;
  children?: DataType[];
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '12%',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '30%',
    key: 'address',
  },
];

const dataSource = Array.from({ length: 15 }).map<DataType>((_, i) => ({
  key: `key${i}`,
  name: `Edward ${i}`,
  age: 32,
  address: `London Park no. ${i}`,
  children: [
    {
      key: `subKey${i}1`,
      name: 'Brown',
      age: 16,
      address: 'New York No. 3 Lake Park',
    },
    {
      key: `subKey${i}2`,
      name: 'Jimmy',
      age: 16,
      address: 'New York No. 3 Lake Park',
    },
  ],
}));

// rowSelection objects indicates the need for row selection
const rowSelection: TableRowSelection<DataType> = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

const App: React.FC = () => {
  const [checkStrictly, setCheckStrictly] = useState(false);
  const [preserveSelectedRowKeys, setPreserveSelectedRowKeys] = useState(true);

  return (
    <>
      <Space align="center" style={{ marginBottom: 16 }}>
        CheckStrictly: <Switch checked={checkStrictly} onChange={setCheckStrictly} />
        preserveSelectedRowKeys:{' '}
        <Switch checked={preserveSelectedRowKeys} onChange={setPreserveSelectedRowKeys} />
      </Space>
      <Table<DataType>
        columns={columns}
        rowSelection={{ ...rowSelection, checkStrictly, preserveSelectedRowKeys }}
        dataSource={dataSource}
        pagination={{ defaultPageSize: 5 }}
      />
    </>
  );
};

export default App;
