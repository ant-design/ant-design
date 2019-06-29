---
category: Components
type: Data Entry
title: TreeSelect
---

Tree selection control.

## When To Use

`TreeSelect` is similar to `Select`, but the values are provided in a tree like structure. Any data whose entries are defined in a hierarchical manner is fit to use this control. Examples of such case may include a corporate hierarchy, a directory structure, and so on.

## API

### Tree props

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| allowClear | Whether allow clear | boolean | false | 3.0.0 |
| autoClearSearchValue | auto clear search input value when multiple select is selected/deselected | boolean | true | 3.7.0 |
| defaultValue | To set the initial selected treeNode(s). | string\|string\[] | - | 3.0.0 |
| disabled | Disabled or not | boolean | false | 3.0.0 |
| dropdownClassName | className of dropdown menu | string | - | 3.3.0 |
| dropdownMatchSelectWidth | Determine whether the dropdown menu and the select input are the same width. Default set `min-width` same as input. | boolean | true | 3.0.0 |
| dropdownStyle | To set the style of the dropdown menu | object | - | 3.0.0 |
| filterTreeNode | Whether to filter treeNodes by input value. The value of `treeNodeFilterProp` is used for filtering by default. | boolean\|Function(inputValue: string, treeNode: TreeNode) (should return boolean) | Function | 3.0.0 |
| getPopupContainer | To set the container of the dropdown menu. The default is to create a `div` element in `body`, you can reset it to the scrolling area and make a relative reposition. [example](https://codepen.io/afc163/pen/zEjNOy?editors=0010) | Function(triggerNode) | () => document.body | 3.0.0 |
| labelInValue | whether to embed label in value, turn the format of value from `string` to `{value: string, label: ReactNode, halfChecked: string[]}` | boolean | false | 3.0.0 |
| loadData | Load data asynchronously. | function(node) | - | 3.0.0 |
| maxTagCount | Max tag count to show | number | - | 3.7.0 |
| maxTagPlaceholder | Placeholder for not showing tags | ReactNode/function(omittedValues) | - | 3.7.0 |
| multiple | Support multiple or not, will be `true` when enable `treeCheckable`. | boolean | false | 3.0.0 |
| placeholder | Placeholder of the select input | string | - | 3.0.0 |
| searchPlaceholder | Placeholder of the search input | string | - | 3.0.0 |
| searchValue | work with `onSearch` to make search value controlled. | string | - | 3.7.0 |
| treeIcon | Shows the icon before a TreeNode's title. There is no default style; you must set a custom style for it if set to `true` | boolean | false | 3.13.1 |
| showCheckedStrategy | The way show selected item in box. **Default:** just show child nodes. **`TreeSelect.SHOW_ALL`:** show all checked treeNodes (include parent treeNode). **`TreeSelect.SHOW_PARENT`:** show checked treeNodes (just show parent treeNode). | enum { TreeSelect.SHOW_ALL, TreeSelect.SHOW_PARENT, TreeSelect.SHOW_CHILD } | TreeSelect.SHOW_CHILD | 3.0.0 |
| showSearch | Support search or not | boolean | single: `false` \| multiple: `true` | 3.0.0 |
| size | To set the size of the select input, options: `large` `small` | string | 'default' | 3.0.0 |
| suffixIcon | The custom suffix icon | ReactNode | - | 3.10.0 |
| treeCheckable | Whether to show checkbox on the treeNodes | boolean | false | 3.0.0 |
| treeCheckStrictly | Whether to check nodes precisely (in the `checkable` mode), means parent and child nodes are not associated, and it will make `labelInValue` be true | boolean | false | 3.0.0 |
| treeData | Data of the treeNodes, manual construction work is no longer needed if this property has been set(ensure the Uniqueness of each value) | array\<{ value, title, children, \[disabled, disableCheckbox, selectable] }> | \[] | 3.0.0 |
| treeDataSimpleMode | Enable simple mode of treeData. Changes the `treeData` schema to: \[{id:1, pId:0, value:'1', title:"test1",...},...] where pId is parent node's id). It is possible to replace the default `id` and `pId` keys by providing object to `treeDataSimpleMode` | false\|object\<{ id: string, pId: string, rootPId: string }> | false | 3.0.0 |
| treeDefaultExpandAll | Whether to expand all treeNodes by default | boolean | false | 3.0.0 |
| treeDefaultExpandedKeys | Default expanded treeNodes | string\[] | - | 3.0.0 |
| treeExpandedKeys | Set expanded keys | string\[] | - | 3.10.0 |
| treeNodeFilterProp | Will be used for filtering if `filterTreeNode` returns true | string | 'value' | 3.0.0 |
| treeNodeLabelProp | Will render as content of select | string | 'title' | 3.0.0 |
| value | To set the current selected treeNode(s). | string\|string\[] | - | 3.0.0 |
| onChange | A callback function, can be executed when selected treeNodes or input value change | function(value, label, extra) | - | 3.0.0 |
| onSearch | A callback function, can be executed when the search input changes. | function(value: string) | - | 3.0.0 |
| onSelect | A callback function, can be executed when you select a treeNode. | function(value, node, extra) | - | 3.0.0 |
| onTreeExpand | A callback function, can be executed when treeNode expanded | function(expandedKeys) | - | 3.10.0 |

### Tree Methods

| Name    | Description  | Version Added |
| ------- | ------------ | ------------- |
| blur()  | remove focus | 3.0.0         |
| focus() | get focus    | 3.0.0         |

### TreeNode props

> We recommend you to use `treeData` rather than `TreeNode`, to avoid the trouble of manual construction.

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| selectable | can be selected | boolean | true | 3.9.3 |
| disableCheckbox | Disables the checkbox of the treeNode | boolean | false | 3.0.0 |
| disabled | Disabled or not | boolean | false | 3.0.0 |
| isLeaf | Leaf node or not | boolean | false | 3.0.0 |
| key | Required property (unless using `treeDataSimpleMode`), should be unique in the tree | string | - | 3.0.0 |
| title | Content showed on the treeNodes | string\|ReactNode | '---' | 3.0.0 |
| value | Will be treated as `treeNodeFilterProp` by default, should be unique in the tree | string | - | 3.0.0 |

## FAQ

### How to get parent node in onChange?

We don't provide this since performance consideration. You can get by this way: <https://codesandbox.io/s/wk080nn81k>
