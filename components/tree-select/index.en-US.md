---
category: Components
type: Form Controls
title: TreeSelect
---

Tree selection control.

## When to use

`TreeSelect` is similar with `Select`, but the values are provided in a tree like structure.
Any data whose entries are defined in a hierarchical manner is fit to use this control. Examples of such case may include a corporate hierarchy, a directory structure, and so on.


## API

### Tree props

Property | Description | Type | Default
-----|-----|-----|------
value | To set the current selected treeNode(s). | __Default:__ String/Array<String>. __With `labelInValue` set:__ { value: String, label: React.Node }/Array<{ value, label }>. __With `treeCheckStrictly` set(`halfChecked` is set to `false`):__ { value: String, label: React.Node, halfChecked }/Array<{ value, label, halfChecked }>. | -
labelInValue | Determine whether to put `label` into `value`, the type of `value` as specified in the above | Boolean | false
defaultValue | To set the initial selected treeNode(s).  | String/Array<String> | -
multiple | Support multiple or not, will be `true` when enable `treeCheckable`. | Boolean | false
onSelect | A callback function, can be executed when you select a treeNode. | function(value, node, extra) | -
onChange | A callback function, can be executed when selected treeNodes or input value change  | function(value, label, extra) | -
allowClear | Whether allow clear  | Boolean | false
onSearch | A callback function, can be executed when the search input changes. | function(value: String) | -
placeholder | Placeholder of the select input | String | -
searchPlaceholder | Placeholder of the search input  | String | -
dropdownStyle | To set the style of the dropdown menu  | Object | -
dropdownMatchSelectWidth | Determine whether the dropdown menu and the select input are the same width  | Boolean | -
size | To set the size of the select input, options: `large` `small`  | String | default
showSearch | Whether to display a search input in the dropdown menu(valid only in the single mode) | Boolean | false
disabled | Disabled or not  | Boolean | false
showCheckedStrategy | __Default:__ just show child nodes. __`TreeSelect.SHOW_ALL`:__ show all checked treeNodes (include parent treeNode). __`TreeSelect.SHOW_PARENT`:__ show checked treeNodes (just show parent treeNode). | enum{TreeSelect.SHOW_ALL, TreeSelect.SHOW_PARENT, TreeSelect.SHOW_CHILD } | TreeSelect.SHOW_CHILD
treeDefaultExpandAll | Whether to expand all treeNodes by default | Boolean | false
treeCheckable | Whether to show checkbox on the treeNodes | Boolean | false
treeCheckStrictly | Whether to check nodes precisely(in the `checkable` mode), means parent and child nodes are not associated | Boolean | false
filterTreeNode | Whether to filter treeNodes by input value. The value of `treeNodeFilterProp` is used for filtering by default. | Boolean/Function(inputValue: string, treeNode: TreeNode) (should return Boolean) | Function
treeNodeFilterProp | Will be used for filtering if `filterTreeNode` returns true | String | 'value'
treeNodeLabelProp | Will render as content of select  | String | 'title'
treeData | Data of the treeNodes, manual construction work is no longer needed if this property has been set(ensure the Uniqueness of each value) | array<{ value, label, children, [disabled, selectable] }> | []
treeDataSimpleMode | Enable simple mode of treeData.(treeData should like this: [{id:1, pId:0, value:'1', label:"test1",...},...], pId is parent node's id)  | Boolean/Object{ id: 'id', pId: 'pId', rootPId: null } | false
loadData | Load data asynchronously.  | function(node) | -
getPopupContainer | To set the container of the dropdown menu. The default is to create a `div` element in `body`, you can reset it to the scrolling area and make a relative reposition. [example](http://codepen.io/anon/pen/xVBOVQ?editors=001) | Function(triggerNode) | () => document.body

### TreeNode props

> We recommend you to use `treeData` rather than `TreeNode`, to avoid the trouble of manual construction.

Property | Description | Type | Default
-----|-----|-----|------
disabled | Disabled or not | Boolean | false
key | Required property, should be unique in the tree  | String | -
value | Will be treated as `treeNodeFilterProp` by default, should be unique in the tree | String | -
title | Content showed on the treeNodes | String/element | '---'
isLeaf | Leaf node or not   | Boolean | false

