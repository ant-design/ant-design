---
category: Components
type: Data Display
title: Tree
subtitle: 树形控件
---

## 何时使用

文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用`树控件`可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

## API

### Tree props

| 参数       | 说明                                      | 类型       | 默认值 |
|-----------|------------------------------------------|------------|--------|
|multiple | 支持点选多个节点（节点本身） | boolean | false |
|checkable | 节点前添加 Checkbox 复选框 | boolean | false |
|defaultExpandAll | 默认展开所有树节点 | boolean | false |
|defaultExpandedKeys | 默认展开指定的树节点 | string[] | [] |
|expandedKeys | （受控）展开指定的树节点 | string[] | [] |
|autoExpandParent | 是否自动展开父节点 | boolean | true |
|defaultCheckedKeys | 默认选中复选框的树节点 | string[] | [] |
|checkedKeys | （受控）选中复选框的树节点（注意：父子节点有关联，如果传入父节点key，则子节点自动选中；相应当子节点key都传入，父节点也自动选中。当设置`checkable`和`checkStrictly`，它是一个有`checked`和`halfChecked`属性的对象，并且父子节点的选中与否不再关联 | string[]\|{checked:string[],halfChecked:string[]} | [] |
|checkStrictly| checkable状态下节点选择完全受控（父子节点选中状态不再关联）| boolean | false |
|defaultSelectedKeys | 默认选中的树节点 | string[] | [] |
|selectedKeys | （受控）设置选中的树节点 | string[] | - |
|onExpand | 展开/收起节点时触发 | function(expandedKeys, {expanded: bool, node}) | - |
|onCheck | 点击复选框触发 | function(checkedKeys, e:{checked: bool, checkedNodes, node, event}) | - |
|onSelect | 点击树节点触发 | function(selectedKeys, e:{selected: bool, selectedNodes, node, event}) | - |
|filterTreeNode | 按需筛选树节点（高亮），返回true | function(node) | - |
|loadData | 异步加载数据 | function(node)| - |
|onRightClick | 响应右键点击 | function({event,node}) | - |
|draggable | 设置节点可拖拽（IE>8） | boolean | false |
|onDragStart | 开始拖拽时调用 | function({event,node}) | - |
|onDragEnter | dragenter 触发时调用 | function({event,node,expandedKeys}) | - |
|onDragOver | dragover 触发时调用 | function({event,node}) | - |
|onDragLeave | dragleave 触发时调用 | function({event,node}) | - |
|onDragEnd | dragend 触发时调用 | function({event,node}) | - |
|onDrop | drop 触发时调用 | function({event, node, dragNode, dragNodesKeys}) | - |

### TreeNode props

| 参数       | 说明                                      | 类型       | 默认值 |
|-----------|------------------------------------------|------------|--------|
|disabled | 禁掉响应 | boolean | false |
|disableCheckbox | 禁掉 checkbox | boolean | false |
|title | 标题 | string\|ReactNode | '---' |
|key | 被树的 (default)ExpandedKeys / (default)CheckedKeys / (default)SelectedKeys 属性所用。注意：整个树范围内的所有节点的 key 值不能重复！ | string | 内部计算出的节点位置 |
|isLeaf | 设置为叶子节点 | boolean | false |

## 注意

树节点可以有很多，但在设置`checkable`时，将会花费更多的计算时间，因此我们缓存了一些计算结果（`this.treeNodesStates`）来复用，避免多次重复计算，以此提高性能。但这也带来了一些限制，当你异步加载树节点时，你需要这样渲染树：

```jsx
{this.state.treeData.length
  ? <Tree>{this.state.treeData.map(data => <TreeNode />)}</Tree>
  : 'loading tree'}
```
