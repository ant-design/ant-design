# 基本

- order: 0

最简单的用法。

---

````jsx
var Tree = antd.Tree;
var TreeNode = Tree.TreeNode;
function handleChecked(checked, c) {
  console.log('checked: ', checked, c );
}
React.render(
  <Tree className="myCls" expandAll={true} onChecked={handleChecked}>
    <TreeNode title="parent 1">
      <TreeNode>leaf </TreeNode>
      <TreeNode title="parent 1-1">
        <TreeNode title="parent 2-1">
          <TreeNode>leaf </TreeNode>
        </TreeNode>
        <TreeNode>leaf </TreeNode>
      </TreeNode>
    </TreeNode>
    <TreeNode>leaf </TreeNode>
  </Tree>
, document.getElementById('components-tree-demo-basic'));
````
