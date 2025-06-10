import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import type { TableColumnsType, TableProps } from 'antd';
import { Badge, Dropdown, Form, Space, Switch, Table } from 'antd';

interface DataType {
  key: React.Key;
  name: string;
  platform: string;
  version: string;
  upgradeNum: number;
  creator: string;
  createdAt: string;
}

interface ExpandedDataType {
  key: React.Key;
  date: string;
  name: string;
  upgradeNum: string;
}

const items = [
  { key: '1', label: 'Action 1' },
  { key: '2', label: 'Action 2' },
];

const expandedColumns: TableProps<ExpandedDataType>['columns'] = [
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  {
    title: 'Status',
    key: 'state',
    render: () => (
      <span>
        <Badge status="success" />
        Finished
      </span>
    ),
  },
  { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  {
    title: 'Action',
    dataIndex: 'operation',
    key: 'operation',
    render: () => (
      <Space size="middle">
        <a>Pause</a>
        <a>Stop</a>
        <Dropdown menu={{ items }}>
          <a>
            More <DownOutlined />
          </a>
        </Dropdown>
      </Space>
    ),
  },
];

const expandedDataSource = Array.from({ length: 3 }).map<ExpandedDataType>((_, i) => ({
  key: i,
  date: '2014-12-24 23:12:00',
  name: 'This is production name',
  upgradeNum: 'Upgraded: 56',
}));

const createExpandedRowRender = (bordered: boolean) => () => (
  <Table<ExpandedDataType>
    columns={expandedColumns}
    dataSource={expandedDataSource}
    pagination={false}
    bordered={bordered}
  />
);

const columns: TableColumnsType<DataType> = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Platform', dataIndex: 'platform', key: 'platform' },
  { title: 'Version', dataIndex: 'version', key: 'version' },
  { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
  { title: 'Creator', dataIndex: 'creator', key: 'creator' },
  { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
  { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
];

const dataSource = Array.from({ length: 3 }).map<DataType>((_, i) => ({
  key: i,
  name: 'Screem',
  platform: 'iOS',
  version: '10.3.4.5654',
  upgradeNum: 500,
  creator: 'Jack',
  createdAt: '2014-12-24 23:12:00',
}));

const App: React.FC = () => {
  const [rootTableBordered, setRootTableBordered] = useState(true);
  const [childTableBordered, setChildTableBordered] = useState(true);
  return (
    <>
      <Form layout="inline" className="table-demo-control-bar" style={{ marginBottom: 16 }}>
        <Form.Item label="Root Table Bordered">
          <Switch checked={rootTableBordered} onChange={(v) => setRootTableBordered(v)} />
        </Form.Item>
        <Form.Item label="Child Table Bordered">
          <Switch checked={childTableBordered} onChange={(v) => setChildTableBordered(v)} />
        </Form.Item>
      </Form>
      <Table<DataType>
        title={() => 'cool'}
        footer={() => 'cool'}
        columns={columns}
        expandable={{ expandedRowRender: createExpandedRowRender(childTableBordered) }}
        dataSource={dataSource}
        bordered={rootTableBordered}
      />
    </>
  );
};

export default App;
