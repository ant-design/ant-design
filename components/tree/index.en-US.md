---
category: Components
type: Views
title: Tree
---

## When to use

Directory, organization, biological classification, country, and etc. Almost things of the world are tree structrue. The `Tree` component is a way of representing the hierachical relationship of these things，and you also can expand, collapse, select the treeNodes of it.

## API

### Tree props

| Property       | Description                                      | Type       | Default |
|----------------|--------------------------------------------------|------------|---------|
|multiple | Whether allow to multiple select treeNode | bool | false |
|checkable | Whether support checkable treeNode | bool   | false    |
|defaultExpandAll | Whether default to expand all treeNodes | bool | false |
|defaultExpandedKeys | Specify keys of default expanded treeNodes | String[] | [] |
|expandedKeys |(controlled) Sepcifies keys of expanded treeNodes | String[] | [] |
|autoExpandParent | Whether to automatically expand a parent treeNode | bool | true |
|defaultCheckedKeys | Specifies keys of default checked treeNodes | String[] | [] |
|checkedKeys |(controlled) Specifies keys of checked treeNodes（PS： When specifies a key of treeNode which is a parent treeNode, all children treeNodes of its will be checked; And vice versa, when specifies a key of treeNode which is a child treeNode, its parent treeNode will also be checked. When `checkable` and `checkStrictly` is true, it'a object has `checked` and `halfChecked` property, and no matter child treeNode or parent treeNode is checked, they won't impact on eachother. | String[]/{checked:Array<String>,halfChecked:Array<String>} | [] |
|checkStrictly| Check treeNode precisely, parent treeNode and children treeNodes are not associated | bool | false |
|defaultSelectedKeys | Specifies keys of default selected treeNodes | String[] | [] |
|selectedKeys |(controlled) Specifies keys of selected treeNode | String[] | - |
|onExpand | Defines a function will be called when expand or collapse a treeNode | function(expandedKeys, {expanded: bool, node}) | - |
|onCheck | Defines a function will be called when the onCheck event occurs | function(checkedKeys, e:{checked: bool, checkedNodes, node, event}) | - |
|onSelect | The callback will be invoked when the user clicks a treeNode | function(selectedKeys, e:{selected: bool, selectedNodes, node, event}) | - |
|filterTreeNode | Defines a function to filter treeNodes（highlight），when return true, corresponding treeNode will be highlight | function(node) | - |
|loadData | load data asynchronously | function(node)| - |
|onRightClick | The call back will be invoked when the user right clicks a treeNoe | function({event,node}) | - |
|draggable | Specifies whether this Tree is draggable（IE>8） | bool | false |
|onDragStart | Defines a function will be called when the onDragStart event occurs | function({event,node}) | - |
|onDragEnter | Defines a function will be called when the onDragEnter event occurs | function({event,node,expandedKeys}) | - |
|onDragOver  | Defines a function will be called when the onDragOver event occurs | function({event,node}) | - |
|onDragLeave | Defines a function will be called when the onDragLeave event occurs | function({event,node}) | - |
|onDrop | Defines a function will be called when the onDrop event occurs | function({event, node, dragNode, dragNodesKeys}) | - |

### TreeNode props

| Property  | Description                              | Type    | Default |
|-----------|------------------------------------------|---------|---------|
|disabled | whether disabled the treeNode | bool | false |
|disableCheckbox | whether disable the checkbox of treeNode | bool | false |
|title | title | String/element | '---' |
|key | it's used with (default)ExpandedKeys / (default)CheckedKeys / (default)SelectedKeys. P.S.: it must be unique in all of treeNodes of the tree! | String | internal calculated position of treeNode |
|isLeaf | whether it's leaf node | bool | false |

## note

The number of treeNodes can be very large, but when enable `checkable`, 
it will spend more computing time, so we cached some calculations(e.g. `this.treeNodesStates`), 
to avoid double computing. But, this bring some restrictions, 
**when you async load treeNodes, you should render tree like this** 
`{this.state.treeData.length ? <Tree ...>{this.state.treeData.map(t => <TreeNode ... />)}</Tree> : 'loading tree'}`
