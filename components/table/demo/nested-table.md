---
order: 24
title:
  en-US: Nested tables
  zh-CN: 嵌套子表格
---

## zh-CN

展示每行数据更详细的信息。

## en-US

Showing more detailed info of every row.

````jsx

import { Table, Badge, Menu, Dropdown, Icon } from 'antd';

const menu = (
  <Menu>
    <Menu.Item>
      Action 1
    </Menu.Item>
    <Menu.Item>
      Action 2
    </Menu.Item>
  </Menu>
);

function NestedTable() {
  const expandedRowRender = () => {
    const columns = [
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Status', key: 'state', render: () => <span><Badge status="success" />Finished</span> },
      { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <span className={'table-operation'}>
            <a href="#">Pause</a>
            <a href="#">Stop</a>
            <Dropdown overlay={menu}>
              <a href="#">
                More <Icon type="down" />
              </a>
            </Dropdown>
          </span>
        ),
      },
    ];

    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56',
      });
    }
    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
      />
    );
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Platform', dataIndex: 'platform', key: 'platform' },
    { title: 'Version', dataIndex: 'version', key: 'version' },
    { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    { title: 'Creator', dataIndex: 'creator', key: 'creator' },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Action', key: 'operation', render: () => <a href="#">Publish</a> },
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      name: 'Screem',
      platform: 'iOS',
      version: '10.3.4.5654',
      upgradeNum: 500,
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00',
    });
  }

  return (
    <Table
      className="components-table-demo-nested"
      columns={columns}
      expandedRowRender={expandedRowRender}
      dataSource={data}
    />
  );
}

ReactDOM.render(<NestedTable />, mountNode);
````

````css
.components-table-demo-nested .ant-table-expanded-row > td:last-child {
  padding: 0 48px 0 8px;
}

.components-table-demo-nested .ant-table-expanded-row > td:last-child .ant-table-thead th {
  border-bottom: 1px solid #e9e9e9;
}

.components-table-demo-nested .ant-table-expanded-row > td:last-child .ant-table-thead th:first-child {
  padding-left: 0;
}

.components-table-demo-nested .ant-table-expanded-row > td:last-child .ant-table-row td:first-child {
  padding-left: 0;
}

.components-table-demo-nested .ant-table-expanded-row .ant-table-row:last-child td {
  border: none;
}

.components-table-demo-nested .ant-table-expanded-row .ant-table-thead > tr > th {
  background: none;
}

.components-table-demo-nested .table-operation a:not(:last-child) {
  margin-right: 24px;
}
````
