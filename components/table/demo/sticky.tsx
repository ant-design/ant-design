import React, { useState } from 'react';
import { Switch, Table } from 'antd';
import type { TableColumnsType } from 'antd';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'Full Name',
    width: 100,
    dataIndex: 'name',
    key: 'name',
    fixed: 'start',
  },
  {
    title: 'Age',
    width: 100,
    dataIndex: 'age',
    key: 'age',
    fixed: 'start',
  },
  {
    title: 'Column 1',
    dataIndex: 'address',
    key: '1',
    width: 150,
  },
  {
    title: 'Column 2',
    dataIndex: 'address',
    key: '2',
    width: 150,
  },
  {
    title: 'Column 3',
    dataIndex: 'address',
    key: '3',
    width: 150,
  },
  {
    title: 'Column 4',
    dataIndex: 'address',
    key: '4',
    width: 150,
  },
  {
    title: 'Column 5',
    dataIndex: 'address',
    key: '5',
    width: 150,
  },
  {
    title: 'Column 6',
    dataIndex: 'address',
    key: '6',
    width: 150,
  },
  {
    title: 'Column 7',
    dataIndex: 'address',
    key: '7',
    width: 150,
  },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'end',
    width: 100,
    render: () => <a>action</a>,
  },
];

const dataSource = Array.from({ length: 100 }).map<DataType>((_, i) => ({
  key: i,
  name: `Edward ${i}`,
  age: 32,
  address: `London Park no. ${i}`,
}));

const App: React.FC = () => {
  const [fixedTop, setFixedTop] = useState(false);
  const [paginationFixedTop, setPaginationFixedTop] = useState(false);
  return (
    <>
      <Switch
        checkedChildren="Pagination Fixed Top"
        unCheckedChildren="Pagination Fixed Top"
        checked={paginationFixedTop}
        onChange={() => {
          setPaginationFixedTop(!paginationFixedTop);
        }}
      />
      <Table<DataType>
        style={{ marginTop: 16 }}
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 1500 }}
        pagination={{
          fixed: { offset: paginationFixedTop ? 64 : 0 },
          placement: [paginationFixedTop ? 'topEnd' : 'bottomEnd'],
        }}
        summary={() => (
          <Table.Summary fixed={fixedTop ? 'top' : 'bottom'}>
            <Table.Summary.Row>
              <Table.Summary.Cell index={0} colSpan={2}>
                <Switch
                  checkedChildren="Fixed Top"
                  unCheckedChildren="Fixed Top"
                  checked={fixedTop}
                  onChange={() => {
                    setFixedTop(!fixedTop);
                  }}
                />
              </Table.Summary.Cell>
              <Table.Summary.Cell index={2} colSpan={8}>
                Scroll Context
              </Table.Summary.Cell>
              <Table.Summary.Cell index={10}>Fix Right</Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        )}
        // antd site header height
        sticky={{ offsetHeader: paginationFixedTop ? 128 : 64, offsetSummary: 64 }}
      />
    </>
  );
};

export default App;
