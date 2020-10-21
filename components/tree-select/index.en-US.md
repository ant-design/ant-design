---
category: Components
type: Data Entry
title: TreeSelect
cover: https://gw.alipayobjects.com/zos/alicdn/Ax4DA0njr/TreeSelect.svg
---

Tree selection control.

## When To Use

`TreeSelect` is similar to `Select`, but the values are provided in a tree like structure. Any data whose entries are defined in a hierarchical manner is fit to use this control. Examples of such case may include a corporate hierarchy, a directory structure, and so on.

## API

### Tree props

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| allowClear | Whether allow clear | boolean | false |  |
| autoClearSearchValue | If auto clear search input value when multiple select is selected/deselected | boolean | true |  |
| bordered | Whether has border style | boolean | true |  |
| defaultValue | To set the initial selected treeNode(s) | string \| string\[] | - |  |
| disabled | Disabled or not | boolean | false |  |
| dropdownClassName | The className of dropdown menu | string | - |  |
| dropdownMatchSelectWidth | Determine whether the dropdown menu and the select input are the same width. Default set `min-width` same as input. Will ignore when value less than select width. `false` will disable virtual scroll | boolean \| number | true |  |
| dropdownRender | Customize dropdown content | (originNode: ReactNode, props) => ReactNode | - |  |
| dropdownStyle | To set the style of the dropdown menu | CSSProperties | - |  |
| filterTreeNode | Whether to filter treeNodes by input value. The value of `treeNodeFilterProp` is used for filtering by default | boolean \| function(inputValue: string, treeNode: TreeNode) (should return boolean) | function |  |
| getPopupContainer | To set the container of the dropdown menu. The default is to create a `div` element in `body`, you can reset it to the scrolling area and make a relative reposition. [example](https://codepen.io/afc163/pen/zEjNOy?editors=0010) | function(triggerNode) | () => document.body |  |
| labelInValue | Whether to embed label in value, turn the format of value from `string` to {value: string, label: ReactNode, halfChecked: string\[]} | boolean | false |  |
| listHeight | Config popup height | number | 256 |  |
| loadData | Load data asynchronously | function(node) | - |  |
| maxTagCount | Max tag count to show | number | - |  |
| maxTagPlaceholder | Placeholder for not showing tags | ReactNode \| function(omittedValues) | - |  |
| multiple | Support multiple or not, will be `true` when enable `treeCheckable` | boolean | false |  |
| placeholder | Placeholder of the select input | string | - |  |
| searchValue | Work with `onSearch` to make search value controlled | string | - |  |
| showArrow | Whether to show the `suffixIcon`，when single selection mode, default `true` | boolean | - |  |
| showCheckedStrategy | The way show selected item in box. **Default:** just show child nodes. **`TreeSelect.SHOW_ALL`:** show all checked treeNodes (include parent treeNode). **`TreeSelect.SHOW_PARENT`:** show checked treeNodes (just show parent treeNode) | `TreeSelect.SHOW_ALL` \| `TreeSelect.SHOW_PARENT` \| `TreeSelect.SHOW_CHILD` | `TreeSelect.SHOW_CHILD` |  |
| showSearch | Support search or not | boolean | single: false \| multiple: true |  |
| size | To set the size of the select input | `large` \| `middle` \| `small` | - |  |
| suffixIcon | The custom suffix icon,you must set `showArrow` to `true` manually in multiple selection mode | ReactNode | - |  |
| switcherIcon | customize collapse \| expand icon of tree node | ReactNode | - |  |
| treeCheckable | Whether to show checkbox on the treeNodes | boolean | false |  |
| treeCheckStrictly | Whether to check nodes precisely (in the `checkable` mode), means parent and child nodes are not associated, and it will make `labelInValue` be true | boolean | false |  |
| treeData | Data of the treeNodes, manual construction work is no longer needed if this property has been set(ensure the Uniqueness of each value) | array&lt;{ value, title, children, \[disabled, disableCheckbox, selectable, checkable] }> | \[] |  |
| treeDataSimpleMode | Enable simple mode of treeData. Changes the `treeData` schema to: \[{id:1, pId:0, value:'1', title:"test1",...},...] where pId is parent node's id). It is possible to replace the default `id` and `pId` keys by providing object to `treeDataSimpleMode` | false \| object&lt;{ id: string, pId: string, rootPId: string }> | false |  |
| treeDefaultExpandAll | Whether to expand all treeNodes by default | boolean | false |  |
| treeDefaultExpandedKeys | Default expanded treeNodes | string\[] | - |  |
| treeExpandedKeys | Set expanded keys | string\[] | - |  |
| treeIcon | Shows the icon before a TreeNode's title. There is no default style; you must set a custom style for it if set to `true` | boolean | false |  |
| treeNodeFilterProp | Will be used for filtering if `filterTreeNode` returns true | string | `value` |  |
| treeNodeLabelProp | Will render as content of select | string | `title` |  |
| value | To set the current selected treeNode(s) | string \| string\[] | - |  |
| virtual | Disable virtual scroll when set to false | boolean | true | 4.1.0 |
| onChange | A callback function, can be executed when selected treeNodes or input value change | function(value, label, extra) | - |  |
| onSearch | A callback function, can be executed when the search input changes | function(value: string) | - |  |
| onSelect | A callback function, can be executed when you select a treeNode | function(value, node, extra) | - |  |
| onTreeExpand | A callback function, can be executed when treeNode expanded | function(expandedKeys) | - |  |

### Tree Methods

| Name | Description | Version |
| --- | --- | --- |
| blur() | Remove focus |  |
| focus() | Get focus |  |

### TreeNode props

> We recommend you to use `treeData` rather than `TreeNode`, to avoid the trouble of manual construction.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| checkable | When Tree is checkable, set TreeNode display Checkbox or not | boolean | - |  |
| disableCheckbox | Disables the checkbox of the treeNode | boolean | false |  |
| disabled | Disabled or not | boolean | false |  |
| isLeaf | Leaf node or not | boolean | false |  |
| key | Required property (unless using `treeDataSimpleMode`), should be unique in the tree | string | - |  |
| selectable | Whether can be selected | boolean | true |  |
| title | Content showed on the treeNodes | ReactNode | `---` |  |
| value | Will be treated as `treeNodeFilterProp` by default, should be unique in the tree | string | - |  |

## FAQ

### How to get parent node in onChange?

We don't provide this since performance consideration. You can get by this way: <https://codesandbox.io/s/wk080nn81k>

### Why sometime customize Option cause scroll break?

You can ref Select [FAQ](/components/select).
