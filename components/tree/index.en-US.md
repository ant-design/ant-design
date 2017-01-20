---
category: Components
type: Data Display
title: Tree
---

## When To Use

Directory, organization, biological classification, country, and etc. Almost things of the world are tree structure. The `Tree` component is a way of representing the hierarchical relationship of these things，and you also can expand, collapse, select the treeNodes of it.

## API

### Tree props

| Property       | Description                                      | Type       | Default |
|----------------|--------------------------------------------------|------------|---------|
|multiple | Whether allow to select multiple treeNodes | boolean | false |
|checkable | Whether support add Checkbox before treeNode | boolean | false |
|defaultExpandAll | Whether default to expand all treeNodes | boolean | false |
|defaultExpandedKeys | Specify keys of default expanded treeNodes | string[] | [] |
|expandedKeys |(controlled) Specifies keys of expanded treeNodes | string[] | [] |
|autoExpandParent | Whether to automatically expand a parent treeNode | boolean | true |
|defaultCheckedKeys | Specifies keys of default checked treeNodes | string[] | [] |
|checkedKeys |(controlled) Specifies keys of checked treeNodes（PS： When specifies a key of treeNode which is a parent treeNode, all children treeNodes of its will be checked; And vice versa, when specifies a key of treeNode which is a child treeNode, its parent treeNode will also be checked. When `checkable` and `checkStrictly` is true, it'a object has `checked` and `halfChecked` property, and no matter child treeNode or parent treeNode is checked, they won't impact on eachother. | string[]/{checked:string[],halfChecked:string[]} | [] |
|checkStrictly| Check treeNode precisely, parent treeNode and children treeNodes are not associated | boolean | false |
|defaultSelectedKeys | Specifies keys of default selected treeNodes | string[] | [] |
|selectedKeys |(controlled) Specifies keys of selected treeNode | string[] | - |
|onExpand | Defines a function will be called when expand or collapse a treeNode | function(expandedKeys, {expanded: bool, node}) | - |
|onCheck | Defines a function will be called when the onCheck event occurs | function(checkedKeys, e:{checked: bool, checkedNodes, node, event}) | - |
|onSelect | The callback will be invoked when the user clicks a treeNode | function(selectedKeys, e:{selected: bool, selectedNodes, node, event}) | - |
|filterTreeNode | Defines a function to filter treeNodes（highlight），when return true, corresponding treeNode will be highlight | function(node) | - |
|loadData | load data asynchronously | function(node)| - |
|onRightClick | The call back will be invoked when the user right clicks a treeNode | function({event,node}) | - |
|draggable | Specifies whether this Tree is draggable（IE>8） | boolean | false |
|onDragStart | Defines a function will be called when the onDragStart event occurs | function({event,node}) | - |
|onDragEnter | Defines a function will be called when the onDragEnter event occurs | function({event,node,expandedKeys}) | - |
|onDragOver  | Defines a function will be called when the onDragOver event occurs | function({event,node}) | - |
|onDragLeave | Defines a function will be called when the onDragLeave event occurs | function({event,node}) | - |
|onDragEnd | Defines a function will be called when the onDragEnd event occurs | function({event,node}) | - |
|onDrop | Defines a function will be called when the onDrop event occurs | function({event, node, dragNode, dragNodesKeys}) | - |

### TreeNode props

| Property  | Description                              | Type    | Default |
|-----------|------------------------------------------|---------|---------|
|disabled | whether disabled the treeNode | boolean | false |
|disableCheckbox | whether disable the checkbox of treeNode | boolean | false |
|title | title | string\|ReactNode | '---' |
|key | it's used with (default)ExpandedKeys / (default)CheckedKeys / (default)SelectedKeys. P.S.: it must be unique in all of treeNodes of the tree! | string | internal calculated position of treeNode |
|isLeaf | whether it's leaf node | boolean | false |

## Note

The number of treeNodes can be very large, but when enable `checkable`,
it will spend more computing time, so we cache some calculations (e.g. `this.treeNodesStates`),
to avoid double computing. But, this bring some restrictions,
**when you load treeNodes asynchronously, you should render tree like this**。

```jsx
{this.state.treeData.length
  ? <Tree>{this.state.treeData.map(data => <TreeNode />)}</Tree>
  : 'loading tree'}
```
