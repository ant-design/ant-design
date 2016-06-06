---
category: Components
chinese: 树形控件
type: Presentation
english: Tree
---

## 何时使用

文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用`树控件`可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

## API

### Tree props

| 参数       | 说明                                      | 类型       | 默认值 |
|-----------|------------------------------------------|------------|--------|
|multiple | 是否支持多选 | bool | false |
|checkable | 是否支持选中 | bool   | false    |
|defaultExpandAll | 默认展开所有树节点 | bool | false |
|defaultExpandedKeys | 默认展开指定的树节点 | String[] | [] |
|expandedKeys | （受控）展开指定的树节点 | String[] | [] |
|autoExpandParent | 是否自动展开父节点 | bool | true |
|defaultCheckedKeys | 默认选中复选框的树节点 | String[] | [] |
|checkedKeys | （受控）选中复选框的树节点（注意： 父子节点有关联，如果传入父节点key，则子节点自动选中；相应当子节点key都传入，父节点也自动选中。当设置`checkable`和`checkStrictly`，它是一个有`checked``halfChecked`属性的对象，并且父子节点的选中与否不再关联 | String[]/{checked:Array<String>,halfChecked:Array<String>} | [] |
|checkStrictly| checkable状态下节点选择完全受控（父子节点选中状态不再关联）| bool | false |
|defaultSelectedKeys | 默认选中的树节点 | String[] | [] |
|selectedKeys | （受控）设置选中的树节点 | String[] | - |
|onExpand | 展开/收起节点时触发 | function(expandedKeys, {expanded: bool, node}) | - |
|onCheck | 点击复选框触发 | function(checkedKeys, e:{checked: bool, checkedNodes, node, event}) | - |
|onSelect | 点击树节点触发 | function(selectedKeys, e:{selected: bool, selectedNodes, node, event}) | - |
|filterTreeNode | 按需筛选树节点（高亮），返回true | function(node) | - |
|loadData | 异步加载数据 | function(node)| - |
|onRightClick | 响应右键点击 | function({event,node}) | - |
|draggable | 设置节点可拖拽（IE>8） | bool | false |
|onDragStart | 开始拖拽时调用 | function({event,node}) | - |
|onDragEnter | dragenter 触发时调用 | function({event,node,expandedKeys}) | - |
|onDragOver | dragover 触发时调用 | function({event,node}) | - |
|onDragLeave | dragleave 触发时调用 | function({event,node}) | - |
|onDrop | drop 触发时调用 | function({event, node, dragNode, dragNodesKeys}) | - |

### TreeNode props

| 参数       | 说明                                      | 类型       | 默认值 |
|-----------|------------------------------------------|------------|--------|
|disabled | 禁掉响应 | bool | false |
|disableCheckbox | 禁掉 checkbox | bool | false |
|title | 标题 | String/element | '---' |
|key | 被树的 (default)ExpandedKeys / (default)CheckedKeys / (default)SelectedKeys 属性所用。注意：整个树范围内的所有节点的 key 值不能重复！ | String | 内部计算出的节点位置 |
|isLeaf | 设置为叶子节点 | bool | false |
