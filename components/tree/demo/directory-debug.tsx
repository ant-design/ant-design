import React from 'react';
import { Flex, Tree } from 'antd';
import type { GetProps, TreeDataNode } from 'antd';

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

const { DirectoryTree } = Tree;

const treeData: TreeDataNode[] = [
  {
    title: 'parent 0',
    key: '0-0',
    children: [
      { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
      { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
    ],
  },
  {
    title: 'parent 1',
    key: '0-1',
    children: [
      { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
      { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
    ],
  },
];

const DemoOne = () => (
  <DirectoryTree draggable defaultExpandAll defaultSelectedKeys={['0-0-0']} treeData={treeData} />
);

const DemoTwo = () => (
  <DirectoryTree checkable defaultExpandAll defaultSelectedKeys={['0-1-0']} treeData={treeData} />
);

const DemoThree = () => (
  <DirectoryTree
    draggable
    checkable
    defaultSelectedKeys={['0-1']}
    defaultExpandAll
    treeData={treeData}
  />
);

const BasicDemo: React.FC = () => {
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };

  return (
    <DirectoryTree
      multiple
      defaultExpandAll
      onSelect={onSelect}
      onExpand={onExpand}
      treeData={treeData}
    />
  );
};

const App = () => (
  <div style={{ height: 500 }}>
    <Flex
      wrap
      gap="large"
      style={{
        transformOrigin: 'top left',
        // 方便视觉回归
        transform: 'scale(2)',
      }}
    >
      <DemoOne />
      <DemoTwo />
      <DemoThree />
      <BasicDemo />
    </Flex>
  </div>
);

export default App;
