# 基本

- order: 0

最简单的用法。

---

````jsx
var Tree = antd.Tree;
var TreeNode = Tree.TreeNode;
React.render(
  <Tree className="myCls" checkable={true}>
        <TreeNode title="parent 1" expanded={false}>
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
        <TreeNode>
          <TreeNode>leaf </TreeNode>
        </TreeNode>
      </Tree>
, document.getElementById('components-tree-demo-basic'));
````

