# 基本

- order: 0

最简单的用法。

---

````jsx
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;

ReactDOM.render(
  <Tree defaultExpandAll={false}>
    <TreeNode title="parent 1">
      <TreeNode title="leaf" />
      <TreeNode title="parent 1-1">
        <TreeNode title="parent 2-1">
          <TreeNode title="leaf" />
          <TreeNode title="leaf" />
        </TreeNode>
        <TreeNode title="leaf" />
      </TreeNode>
    </TreeNode>
  </Tree>
, document.getElementById('components-tree-demo-basic'));
````
