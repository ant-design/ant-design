# 可选择

- order: 1

提供复选框操作功能。

---

````jsx
var Tree = antd.Tree;
var TreeNode = Tree.TreeNode;

function handleCheck(info) {
  console.log('check: ', info);
}

React.render(<div>
 <Tree defaultExpandAll={true} checkable={true} onCheck={handleCheck}>
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
</div>
, document.getElementById('components-tree-demo-checkbox'));
````
