import React from 'react';
import { Tree } from 'antd';
import type { TreeDataNode } from 'antd';

const treeData: TreeDataNode[] = [
  {
    title:
      'Very long parent title so the node wraps to multiple lines. Use this to verify the expand switcher aligns with the checkbox, and the switcher hover background stays vertically centered.',
    key: 'parent',
    children: [{ title: 'Child', key: 'child' }],
  },
];

const App: React.FC = () => (
  <Tree
    checkable
    defaultExpandAll
    defaultCheckedKeys={['child']}
    treeData={treeData}
    style={{ width: 240 }}
  />
);

export default App;
