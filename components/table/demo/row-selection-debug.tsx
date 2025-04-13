import React, { useState } from 'react';
import { InputNumber, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

const RenderTimes: React.FC = () => {
  const timesRef = React.useRef(0);
  timesRef.current += 1;
  return <span>{timesRef.current}</span>;
};

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const shouldCellUpdate = (record: DataType, prevRecord: DataType) => record !== prevRecord;

const columns: TableColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    shouldCellUpdate,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    shouldCellUpdate,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    shouldCellUpdate,
    render: (addr) => (
      <>
        {addr}
        <RenderTimes />
      </>
    ),
  },
];

function genData(length: number) {
  return Array.from({ length }).map<DataType>((_, i) => ({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    address: `London, Park Lane no. ${i}`,
  }));
}

const App: React.FC = () => {
  const [data, setData] = useState<DataType[]>(genData(50));
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <>
      <InputNumber
        value={data.length}
        onChange={(cnt) => {
          setData(genData(cnt || 0));
        }}
      />
      <Table<DataType>
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    </>
  );
};

export default App;
