---
category: Components
type: Data Entry
title: TreeSelect
---

Tree selection control.

## When To Use

`TreeSelect` is similar to `Select`, but the values are provided in a tree like structure.
Any data whose entries are defined in a hierarchical manner is fit to use this control. Examples of such case may include a corporate hierarchy, a directory structure, and so on.


## API

### Tree props

Property | Description | Type | Default
-----|-----|-----|------
value | To set the current selected treeNode(s). | string\|string[] | -
labelInValue | whether to embed label in value, turn the format of value from `string` to `{key: string, label: ReactNode, halfChecked: string[]} | boolean | false
defaultValue | To set the initial selected treeNode(s).  | string\|string[] | -
multiple | Support multiple or not, will be `true` when enable `treeCheckable`. | boolean | false
onSelect | A callback function, can be executed when you select a treeNode. | function(value, node, extra) | -
onChange | A callback function, can be executed when selected treeNodes or input value change  | function(value, label, extra) | -
allowClear | Whether allow clear  | boolean | false
onSearch | A callback function, can be executed when the search input changes. | function(value: string) | -
placeholder | Placeholder of the select input | string | -
searchPlaceholder | Placeholder of the search input  | string | -
dropdownStyle | To set the style of the dropdown menu  | object | -
dropdownMatchSelectWidth | Determine whether the dropdown menu and the select input are the same width  | boolean | true
size | To set the size of the select input, options: `large` `small`  | string | 'default'
showSearch | Whether to display a search input in the dropdown menu(valid only in the single mode) | boolean | false
disabled | Disabled or not  | boolean | false
showCheckedStrategy | __Default:__ just show child nodes. __`TreeSelect.SHOW_ALL`:__ show all checked treeNodes (include parent treeNode). __`TreeSelect.SHOW_PARENT`:__ show checked treeNodes (just show parent treeNode). | enum{TreeSelect.SHOW_ALL, TreeSelect.SHOW_PARENT, TreeSelect.SHOW_CHILD } | TreeSelect.SHOW_CHILD
treeDefaultExpandAll | Whether to expand all treeNodes by default | boolean | false
treeDefaultExpandedKeys | Default expanded treeNodes | string[] | -
treeCheckable | Whether to show checkbox on the treeNodes | boolean | false
treeCheckStrictly | Whether to check nodes precisely(in the `checkable` mode), means parent and child nodes are not associated | boolean | false
filterTreeNode | Whether to filter treeNodes by input value. The value of `treeNodeFilterProp` is used for filtering by default. | boolean\|Function(inputValue: string, treeNode: TreeNode) (should return boolean) | Function
treeNodeFilterProp | Will be used for filtering if `filterTreeNode` returns true | string | 'value'
treeNodeLabelProp | Will render as content of select  | string | 'title'
treeData | Data of the treeNodes, manual construction work is no longer needed if this property has been set(ensure the Uniqueness of each value) | array<{ value, label, children, [disabled, selectable] }> | []
treeDataSimpleMode | Enable simple mode of treeData.(treeData should like this: [{id:1, pId:0, value:'1', label:"test1",...},...], pId is parent node's id)  | false\|Array<{ id: string, pId: string, rootPId: null }> | false
loadData | Load data asynchronously.  | function(node) | -
getPopupContainer | To set the container of the dropdown menu. The default is to create a `div` element in `body`, you can reset it to the scrolling area and make a relative reposition. [example](http://codepen.io/anon/pen/xVBOVQ?editors=001) | Function(triggerNode) | () => document.body

### TreeNode props

> We recommend you to use `treeData` rather than `TreeNode`, to avoid the trouble of manual construction.

Property | Description | Type | Default
-----|-----|-----|------
disabled | Disabled or not | boolean | false
key | Required property, should be unique in the tree  | string | -
value | Will be treated as `treeNodeFilterProp` by default, should be unique in the tree | string | -
title | Content showed on the treeNodes | string\|ReactNode | '---'
isLeaf | Leaf node or not   | boolean | false
