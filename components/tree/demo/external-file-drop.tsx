import React from 'react';
import { App, Tree } from 'antd';
import type { GetProps, TreeDataNode } from 'antd';

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

const treeData: TreeDataNode[] = [
  {
    title: 'Documents',
    key: 'documents',
    children: [
      { title: 'Invoices', key: 'invoices', isLeaf: true },
      { title: 'Reports', key: 'reports', isLeaf: true },
    ],
  },
];

const Demo: React.FC = () => {
  const { message } = App.useApp();

  const onFileDrop: DirectoryTreeProps['onFileDrop'] = ({ files }) => {
    message.success(`Dropped ${files.length} file(s)`);
  };

  return (
    <Tree.DirectoryTree
      allowFileDrop
      defaultExpandAll
      treeData={treeData}
      onFileDrop={onFileDrop}
    />
  );
};

const AppDemo: React.FC = () => (
  <App>
    <Demo />
  </App>
);

export default AppDemo;
