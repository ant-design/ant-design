import { Button, Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import React from 'react';

const App: React.FC = () => {
  const [treeData, setTreeData] = React.useState<DataNode[]>([
    {
      key: '1-1',
      title: '1-1',
      children: [
        { key: '1-1-1', title: '1-1-1' },
        { key: '1-1-2', title: '1-1-2' },
        { key: '1-1-3', title: '1-1-3' },
      ],
    },
    {
      key: '1-2',
      title: '1-2',
      children: [
        { key: '1-2-1', title: '1-2-1' },
        { key: '1-2-2', title: '1-2-2' },
        { key: '1-2-3', title: '1-2-3' },
      ],
    },
    {
      key: '1-3',
      title: '1-3',
    },
  ]);

  const handleDelete = () => {
    setTreeData([
      {
        key: '1-1',
        title: '1-1',
        children: [
          { key: '1-1-1', title: '1-1-1' },
          { key: '1-1-2', title: '1-1-2' },
          { key: '1-1-3', title: '1-1-3' },
        ],
      },
      {
        key: '1-2',
        title: '1-2',
        children: [
          { key: '1-2-1', title: '1-2-1' },
          { key: '1-2-3', title: '1-2-3' },
        ],
      },
      {
        key: '1-3',
        title: '1-3',
      },
    ]);
  };

  return (
    <div>
      <Tree defaultExpandAll style={{ transform: '* 20s' }} showLine treeData={treeData} />
      <Button onClick={handleDelete}>Delete</Button>
    </div>
  );
};

export default App;
