import React from 'react';
import { Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';

const treeData: DataNode[] = [
  {
    title: <div style={{ boxShadow: 'inset 0 0 0 1px red' }}>parent 1</div>,
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
      },
    ],
  },
];

const App: React.FC = () => {
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    console.log('onCheck', checkedKeys, info);
  };

  return (
    <Tree
      checkable
      defaultSelectedKeys={['0-0']}
      defaultExpandAll
      onSelect={onSelect}
      onCheck={onCheck}
      treeData={treeData}
      blockNode
    />
  );
};

export default App;
