---
order: 25
title:
  en-US: Nested tables
  zh-CN: 嵌套子表格
---

## zh-CN

展示每行数据更详细的信息。

## en-US

Showing more detailed info of every row.

```tsx
import { DownOutlined } from '@ant-design/icons';
import type { TableColumnsType } from 'antd';
import { Badge, Dropdown, Menu, Space, Table } from 'antd';
import React from 'react';

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

const menu = (
  <Menu
    items={[
      { key: '1', label: 'Action 1' },
      { key: '2', label: 'Action 2' },
    ]}
  />
);

const App: React.FC = () => {
  const expandedRowRender = () => {
    const columns: TableColumnsType<ExpandedDataType> = [
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
            <Dropdown overlay={menu}>
              <a>
                More <DownOutlined />
              </a>
            </Dropdown>
          </Space>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns: TableColumnsType<DataType> = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Platform', dataIndex: 'platform', key: 'platform' },
    { title: 'Version', dataIndex: 'version', key: 'version' },
    { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    { title: 'Creator', dataIndex: 'creator', key: 'creator' },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Action', key: 'operation', render: () => <a>Publish</a> },
  ];

  const data: DataType[] = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      name: 'Screem',
      platform: 'iOS',
      version: '10.3.4.5654',
      upgradeNum: 500,
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
    });
  }

  return (
    <>
      <Table
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        dataSource={data}
      />
      <Table
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        dataSource={data}
        size="middle"
      />
      <Table
        columns={columns}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        dataSource={data}
        size="small"
      />
    </>
  );
};

export default App;
```
