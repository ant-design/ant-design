import React, { useState } from 'react';
import { Table, InputNumber } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';

const RenderTimes = () => {
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

const shouldCellUpdate = (record: any, prevRecord: any) => record !== prevRecord;

const columns: ColumnsType<DataType> = [
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

function genData(count: number) {
  const data: DataType[] = [];

  for (let i = 0; i < count; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }

  return data;
}

const App: React.FC = () => {
  const [data, setData] = useState(genData(50));
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
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} />
    </>
  );
};

export default App;
