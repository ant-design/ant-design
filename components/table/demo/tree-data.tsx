import React, { useState } from 'react';
import { Space, Switch, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';

interface DataType {
  key: React.ReactNode;
  name: string;
  age: number;
  address: string;
  children?: DataType[];
}

const columns: ColumnsType<DataType> = [
  {
    title: '应用/功能',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '说明',
    dataIndex: 'age',
    key: 'age',
    width: '12%',
  },
  {
    title: '操作',
    dataIndex: 'address',
    width: '30%',
    key: 'address',
  },
];

const data: DataType[] = [
  {
    key: 1,
    name: '报送',
    age: '数据报送',
    address: '配置',
    children: [
      {
        key: 11,
        name: '我的填报',
        age: 'xxxxxxxxxxxxxxxxxxxxxx',
        address: '配置',
      },
      {
        key: 12,
        name: '报送审核',
        age: 'xxxxxxxxxxxxxxxxxxxxxx',
        address: '配置',
      },
      {
        key: 13,
        name: '配置管理',
        age: 'xxxxxxxxxxxxxxxxxxxxxx',
        address: '配置',
      },
    ],
  },
  {
    key: 2,
    name: '报表',
    age: 'xxxxxxxxxxxxxxxxxxxxxx',
    address: '配置',
  },
  {
    key: 3
    name: '雷达',
    age: 'xxxxxxxxxxxxxxxxxxxxxx',
    address: '配置',
  },
  {
    key: 4
    name: '应用',
    age: 'xxxxxxxxxxxxxxxxxxxxxx',
    address: '配置',
    children: [
      {
        key: 41,
        name: '项目数字报告',
        age: 'xxxxxxxxxxxxxxxxxxxxxx',
        address: '配置',
      },
      {
        key: 42,
        name: '企业风险360',
        age: 'xxxxxxxxxxxxxxxxxxxxxx',
        address: '配置',
      },
      {
        key: 43,
        name: '区域经济',
        age: 'xxxxxxxxxxxxxxxxxxxxxx',
        address: '配置',
      },
      {
        key: 44,
        name: '城投项目助手',
        age: 'xxxxxxxxxxxxxxxxxxxxxx',
        address: '配置',
      },
      {
        key: 45,
        name: '数字化风控报告',
        age: 'xxxxxxxxxxxxxxxxxxxxxx',
        address: '配置',
      },
    ],
  },
];

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

  return (
    <>
      <Space align="center" style={{ marginBottom: 16 }}>
        CheckStrictly: <Switch checked={checkStrictly} onChange={setCheckStrictly} />
      </Space>
      <Table
        columns={columns}
        rowSelection={{ ...rowSelection, checkStrictly }}
        dataSource={data}
      />
    </>
  );
};

export default App;
