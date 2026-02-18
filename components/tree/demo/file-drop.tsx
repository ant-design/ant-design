import React from 'react';
import { message, Tree } from 'antd';
import type { TreeDataNode } from 'antd';

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

const App: React.FC = () => {
  const onSelect = (keys: React.Key[], info: any) => {
    console.log('Trigger Select', keys, info);
  };

  const onExpand = (keys: React.Key[], info: any) => {
    console.log('Trigger Expand', keys, info);
  };

  // Handle file drop from the file system
  const onFileDrop = (info: { event: React.DragEvent; nodeKey: string; files: FileList }) => {
    console.log('Files dropped:', info);

    // Process the dropped files
    for (let i = 0; i < info.files.length; i++) {
      const file = info.files[i];
      console.log(`File ${i + 1}:`, file.name, file.size, file.type);
    }

    // Show a message to the user
    message.success(`Successfully dropped ${info.files.length} file(s)`);
  };

  return (
    <DirectoryTree
      multiple
      // Ineffective when allowFileDrop is enabled - draggable is disabled to prevent event conflicts
      draggable
      defaultExpandAll
      onSelect={onSelect}
      onExpand={onExpand}
      treeData={treeData}
      // Enable file drop functionality
      allowFileDrop
      onFileDrop={onFileDrop}
    />
  );
};

export default App;
