# 基本

- order: 1

提供复选框操作功能。

---

````jsx
var Tree = antd.Tree;
var TreeNode = Tree.TreeNode;
React.render(
  <Tree expandAll={true} checkable={true}>
    <TreeNode title="parent 1">
      <TreeNode>leaf </TreeNode>
      <TreeNode title="parent 1-1">
        <TreeNode title="parent 2-1">
          <TreeNode>leaf </TreeNode>
          <TreeNode>leaf </TreeNode>
        </TreeNode>
        <TreeNode>leaf </TreeNode>
        <TreeNode>leaf </TreeNode>
      </TreeNode>
    </TreeNode>
    <TreeNode>leaf </TreeNode>
    <TreeNode>leaf </TreeNode>
  </Tree>
, document.getElementById('components-tree-demo-checkbox'));
````
