---
category: Components
type: Data Display
title: Tree
---

## When To Use

Almost anything can be represented in a tree structure. Examples include directories, organization hierarchies, biological classifications, countries, etc. The `Tree` component is a way of representing the hierarchical relationship between these things. You can also  expand, collapse, and select a treeNode within a `Tree`.

## API

### Tree props

| Property       | Description                                      | Type       | Default |
|----------------|--------------------------------------------------|------------|---------|
|multiple | Allows selecting multiple treeNodes | boolean | false |
|checkable | Adds a `Checkbox` before the treeNodes | boolean | false |
|defaultExpandAll | Whether to expand all treeNodes by default | boolean | false |
|defaultExpandedKeys | Specify the keys of the default expanded treeNodes | string[] | [] |
|expandedKeys |(Controlled) Specifies the keys of the expanded treeNodes | string[] | [] |
|autoExpandParent | Whether to automatically expand a parent treeNode | boolean | true |
|defaultCheckedKeys | Specifies the keys of the default checked treeNodes | string[] | [] |
|checkedKeys |(Controlled) Specifies the keys of the checked treeNodes (PS: When this specifies the key of a treeNode which is also a parent treeNode, all the children treeNodes of will be checked; and vice versa, when it specifies the key of a treeNode which is a child treeNode, its parent treeNode will also be checked. When `checkable` and `checkStrictly` is true, its object has `checked` and `halfChecked` property. Regardless of whether the child or parent treeNode is checked, they won't impact each other. | string[] \| {checked: string[], halfChecked: string[]} | [] |
|checkStrictly| Check treeNode precisely; parent treeNode and children treeNodes are not associated | boolean | false |
|defaultSelectedKeys | Specifies the keys of the default selected treeNodes | string[] | [] |
|selectedKeys |(Controlled) Specifies the keys of the selected treeNodes | string[] | - |
|onExpand | Callback function for when a treeNode is expanded or collapsed | function(expandedKeys, {expanded: bool, node}) | - |
|onCheck | Callback function for when the onCheck event occurs | function(checkedKeys, e:{checked: bool, checkedNodes, node, event}) | - |
|onSelect | Callback function for when the user clicks a treeNode | function(selectedKeys, e:{selected: bool, selectedNodes, node, event}) | - |
|filterTreeNode | Defines a function to filter (highlight) treeNodes. When the function returns `true`, the corresponding treeNode will be highlighted | function(node) | - |
|loadData | Load data asynchronously | function(node)| - |
|onRightClick | Callback function for when the user right clicks a treeNode | function({event, node}) | - |
|draggable | Specifies whether this Tree is draggable (IE > 8) | boolean | false |
|onDragStart | Callback function for when the onDragStart event occurs | function({event, node}) | - |
|onDragEnter | Callback function for when the onDragEnter event occurs | function({event, node,  expandedKeys}) | - |
|onDragOver  | Callback function for when the onDragOver event occurs | function({event, node}) | - |
|onDragLeave | Callback function for when the onDragLeave event occurs | function({event, node}) | - |
|onDragEnd | Callback function for when the onDragEnd event occurs | function({event, node}) | - |
|onDrop | Callback function for when the onDrop event occurs | function({event, node, dragNode, dragNodesKeys}) | - |
|showLine | Shows a connecting line | boolean | false |
|showIcon | Shows the icon before a TreeNode's title. There is no default style; you must set a custom style for it if set to `true` | boolean | false |

### TreeNode props

| Property  | Description                              | Type    | Default |
|-----------|------------------------------------------|---------|---------|
|disabled | Disables the treeNode | boolean | false |
|disableCheckbox | Disables the checkbox of the treeNode | boolean | false |
|title | Title | string\|ReactNode | '---' |
|key | Used with (default)ExpandedKeys / (default)CheckedKeys / (default)SelectedKeys. P.S.: It must be unique in all of treeNodes of the tree! | string | internal calculated position of treeNode |
|isLeaf | Determines if this is a leaf node | boolean | false |

## Note

The number of treeNodes can be very large, but when `checkable=true`,
it will increase the compute time. So, we cache some calculations (e.g. `this.treeNodesStates`)
to avoid double computing. But, this brings some restrictions.
**When you load treeNodes asynchronously, you should render tree like this**:

```jsx
{this.state.treeData.length
  ? <Tree>{this.state.treeData.map(data => <TreeNode />)}</Tree>
  : 'loading tree'}
```
