import React from 'react';
import { Tree } from 'antd';
import type { TreeDataNode } from 'antd';

// 父节点标题出现换行时，统一展开箭头、复选框、标题内容垂直对齐方式，
// 且展开箭头 hover 跟随展开图标位置（大小保持源代码固定大小）。
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
