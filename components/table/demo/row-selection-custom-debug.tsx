import React from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';

interface DataType {
  key: React.Key;
  name: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
];

const data: DataType[] = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: i % 2 === 0 ? `Edward King ${i}` : 'Another Row',
  });
}

const App: React.FC = () => {
  const rowSelection: TableRowSelection<DataType> = {
    renderCell: (checked, _record, index, node) => ({
      props: { rowSpan: index % 2 === 0 ? 2 : 0 },
      children: (
        <>
          {String(checked)}: {node}
        </>
      ),
    }),
  };
  return <Table rowSelection={rowSelection} columns={columns} dataSource={data} />;
};

export default App;
