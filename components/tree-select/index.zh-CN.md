---
category: Components
chinese: 树选择
type: Form Controls
english: TreeSelect
---

树型选择控件。

## 何时使用

类似 Select 的选择控件，可选择的数据结构是一个树形结构时，可以使用 TreeSelect，例如公司层级、学科系统、分类目录等等。

## API

### Tree props

| 参数       | 说明                                      | 类型       | 默认值 |
|-----------|------------------------------------------|------------|--------|
| value    | 指定当前选中的条目 | 通常: String/Array<String>. 设置 labelInValue: {value: String, label: React.Node}/Array<{value, label}>. 设置 treeCheckStrictly(halfChecked 默认为 false): {value: String, label: React.Node, halfChecked}/Array<{value, label, halfChecked}>. |  -  |
| labelInValue | 是否把 label 嵌入到 value 里，设置后参考以上 value 类型写法  | Boolean | false |
| defaultValue | 指定默认选中的条目 | String/Array<String>   |  -  |
| multiple   | 支持多选（当设置 treeCheckable 时自动变为true） | Boolean | false |
| onSelect | 被选中时调用 | function(value, node, extra) | -   |
| onChange | 选中树节点时调用此函数 | function(value, label, extra) | - |
| allowClear | 显示清除按钮 | Boolean | false |
| onSearch | 文本框值变化时回调 | function(value: String) | - |
| placeholder | 选择框默认文字 | String | - |
| searchPlaceholder | 搜索框默认文字 | String | - |
| dropdownStyle | 下拉菜单的样式 | Object | - |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽 | Boolean | true |
| size    | 选择框大小，可选 `large` `small`  | String      |      default      |
| showSearch | 在下拉中显示搜索框(仅在单选模式下生效) | Boolean | false |
| disabled | 是否禁用 | Boolean | false |
| showCheckedStrategy | `TreeSelect.SHOW_ALL`: 显示所有选中节点(包括父节点). `TreeSelect.SHOW_PARENT`: 只显示父节点(当父节点下所有子节点都选中时). 默认只显示子节点. | enum{TreeSelect.SHOW_ALL, TreeSelect.SHOW_PARENT, TreeSelect.SHOW_CHILD } | TreeSelect.SHOW_CHILD |
| treeDefaultExpandAll | 默认展开所有树节点 | Boolean | false |
| treeCheckable | 显示 checkbox | Boolean | false |
| treeCheckStrictly | checkable 状态下节点选择完全受控（父子节点选中状态不再关联）| Boolean | false |
| filterTreeNode | 是否根据输入项进行筛选，默认用 treeNodeFilterProp 的值作为要筛选的 TreeNode 的属性值 | Boolean/Function(inputValue: string, treeNode: TreeNode) (函数需要返回bool值) | Function |
| treeNodeFilterProp | 输入项过滤对应的 treeNode 属性 | String | 'value' |
| treeNodeLabelProp | 作为显示的 prop 设置 | String | 'title' |
| treeData | treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（value 在整个树范围内唯一）| array<{value, label, children, [disabled, selectable]}> | [] |
|treeDataSimpleMode | 使用简单格式的 treeData，具体设置参考可设置的类型 (此时 treeData 应变为这样的数据结构: [{id:1, pId:0, value:'1', label:"test1",...},...], `pId` 是父节点的 id) | Boolean/Object{id: 'id', pId: 'pId', rootPId: null} | false |
| loadData | 异步加载数据 | function(node) | - |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](http://codepen.io/anon/pen/xVBOVQ?editors=001) | Function(triggerNode) | () => document.body |

### TreeNode props

> 建议使用 treeData 来代替 TreeNode，免去手工构造麻烦

| 参数       | 说明                                      | 类型       | 默认值 |
|-----------|------------------------------------------|------------|--------|
| disabled    | 是否禁用 | Boolean   |  false  |
| key   | 此项必须设置（其值在整个树范围内唯一） |  String | - |
| value   | 默认根据此属性值进行筛选（其值在整个树范围内唯一） | String | - |
| title | 树节点显示的内容 | String/element | '---' |
| isLeaf | 是否是叶子节点 | Boolean | false |
