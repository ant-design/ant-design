---
category: Components
chinese: 树选择
type: Form Control
english: TreeSelect
---

树型选择控件。

## 何时使用

类似 Select 的选择控件，可选择的数据结构是一个树形结构时，可以使用 TreeSelect，例如公司层级、学科系统、分类目录等等。

## API

### Tree props

| 参数       | 说明                                      | 类型       | 默认值 |
|-----------|------------------------------------------|------------|--------|
| value    | 指定当前选中的条目 | 通常: String/Array<String>. 设置labelInValue: {value:String,label:React.Node}/Array<{value,label}>. 设置treeCheckStrictly(halfChecked默认为false): {value:String,label:React.Node, halfChecked}/Array<{value,label,halfChecked}>. |  无  |
| labelInValue | 是否把 label 嵌入到 value 里，设置后参考以上 value 类型写法  | boolean | false |
| defaultValue | 指定默认选中的条目 | string/Array<String>   |  无  |
| multiple   | 支持多选（当设置 treeCheckable 时自动变为true） | boolean | false |
| onSelect | 被选中时调用，参数为选中项的 value 值 | function(value, node, extra) | 无   |
| onChange | 选中树节点时调用此函数 | function(value, label, extra) | 无 |
| allowClear | 显示清除按钮 | boolean | false |
| onSearch | 文本框值变化时回调 | function(value: String) |  |
| placeholder | 选择框默认文字 | string | 无 |
| searchPlaceholder | 搜索框默认文字 | string | 无 |
| dropdownStyle | 下拉菜单的样式 | object | 无 |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽 | boolean | true |
| size    | 选择框大小，可选 `large` `small`  | String      |      default      |
| showSearch | 在下拉中显示搜索框(仅在单选模式下生效) | boolean | false |
| disabled | 是否禁用 | boolean | false |
| showCheckedStrategy | `TreeSelect.SHOW_ALL`: 显示所有选中节点(包括父节点). `TreeSelect.SHOW_PARENT`: 只显示父节点(当父节点下所有子节点都选中时). 默认只显示子节点. | enum{TreeSelect.SHOW_ALL, TreeSelect.SHOW_PARENT, TreeSelect.SHOW_CHILD } | TreeSelect.SHOW_CHILD |
| treeDefaultExpandAll | 默认展开所有树节点 | bool | false |
| treeCheckable | 显示checkbox | bool | false |
| treeCheckStrictly | checkable状态下节点选择完全受控（父子节点选中状态不再关联）| bool | false |
| filterTreeNode | 是否根据输入项进行筛选，默认用 treeNodeFilterProp 的值作为要筛选的 TreeNode 的属性值 | bool/Function(inputValue:string, treeNode:TreeNode) (函数需要返回bool值) | Function |
| treeNodeFilterProp | 输入项过滤对应的 treeNode 属性 | String | 'value' |
| treeNodeLabelProp | 作为显示的prop设置 | String | 'title' |
| treeData | treeNodes数据，如果设置则不需要手动构造TreeNode节点（value在整个树范围内唯一）| array<{value, label, children, [disabled]}> | [] |
|treeDataSimpleMode | 使用简单格式的treeData，具体设置参考可设置的类型 (此时treeData应变为这样的数据结构: [{"id":1, "pId":0, "label":"test1"},...], `pId`是父节点的id) | bool/object{id:'id', pId:'pId', rootPId:null} | false |
| loadData | 异步加载数据 | function(node) | - |

### TreeNode props
> 建议使用 treeData 来代替 TreeNode，免去手工构造麻烦

| 参数       | 说明                                      | 类型       | 默认值 |
|-----------|------------------------------------------|------------|--------|
| disabled    | 是否禁用 | Boolean   |  false  |
| key   | 此项必须设置（其值在整个树范围内唯一） |  String | - |
| value   | 默认根据此属性值进行筛选（其值在整个树范围内唯一） | String | - |
| title | 树节点显示的内容 | String/element | '---' |
| isLeaf | 是否是叶子节点 | bool | false |
