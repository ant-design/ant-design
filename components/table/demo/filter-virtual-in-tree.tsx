import React from 'react';
import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

interface TreeNode {
  name: string;
  parent: string | null;
}

const buildTreeFilters = (data: TreeNode[], parent: string | null): any => {
  const children = data.filter((item) => item.parent === parent);
  if (children.length === 0) {
    return null;
  }
  return children.map((child) => ({
    text: child.name,
    value: child.name,
    children: buildTreeFilters(data, child.name),
  }));
};

const treeData: TreeNode[] = [];
for (let i = 1; i < 10; i++) {
  const parent = { name: `Name ${i}`, parent: null };
  treeData.push(parent);
  for (let j = 0; j < 10; j++) {
    const child = { name: `Name ${i}${j}`, parent: parent.name };
    treeData.push(child);
  }
}

const filterOptions = buildTreeFilters(treeData, null);

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: filterOptions || [],
    onFilter: (value: string, record) => record.name.indexOf(value) === 0,
    filterSearch: true,
    height: 317,
    filterMode: 'tree',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data = Array.from({ length: 100 }, (_, i) => ({
  key: i,
  name: `Name ${i}`,
  age: 20 + Math.floor(Math.random() * 30),
  address: `Address ${i}`,
}));

const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

const App: React.FC = () => <Table columns={columns} dataSource={data} onChange={onChange} />;

export default App;
