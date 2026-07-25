import React from 'react';
import type { TableColumnsType, TabsProps } from 'antd';
import { Table, Tabs } from 'antd';

interface DataType {
  key: string;
  name: string;
}

const columns: TableColumnsType<DataType> = [{ title: 'Name', dataIndex: 'name' }];

const dataSource: DataType[] = [{ key: '0', name: 'Jack' }];

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Tab 1',
    children: (
      <Table<DataType> bordered columns={columns} dataSource={dataSource} pagination={false} />
    ),
  },
];

const expandedRowRender = () => <Tabs defaultActiveKey="1" items={items} />;

const App: React.FC = () => (
  <Table<DataType>
    columns={columns}
    dataSource={dataSource}
    expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
    pagination={false}
  />
);

export default App;
