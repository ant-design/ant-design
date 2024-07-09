import React, { useState } from 'react';
import { Tree, Input } from 'antd';
import type { TreeDataNode } from 'antd';

const { Search } = Input;

const treeData: TreeDataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'child 0-0-1',
        key: '0-0-1',
      },
      {
        title: 'child 0-0-2',
        key: '0-0-2',
      },
      {
        title: 'child 0-0-3',
        key: '0-0-3',
      },
      {
        title: 'child 0-0-4',
        key: '0-0-4',
      },
    ],
  },
  {
    title: 'parent 2',
    key: '0-1',
    children: [
      {
        title: 'child 0-1-1',
        key: '0-1-1',
      },
      {
        title: 'child 0-1-2',
        key: '0-1-2',
      },
      {
        title: 'child 0-1-3',
        key: '0-1-1',
      },
      {
        title: 'child 0-1-4',
        key: '0-1-2',
      },
    ],
  },
];

const App: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <>
      <Search placeholder="Search" onChange={onSearchChange} value={searchValue} />
      <Tree
        expandedKeys={['0-0', '0-1']}
        autoExpandParent
        filterTreeNode={(node) => {
          if (searchValue !== '') {
            return String(node.title).includes(searchValue);
          }
          return false;
        }}
        treeData={treeData}
      />
    </>
  );
};

export default App;
