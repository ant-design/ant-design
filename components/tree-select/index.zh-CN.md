---
category: Components
subtitle: 树选择
type: 数据录入
title: TreeSelect
---

树型选择控件。

## 何时使用

类似 Select 的选择控件，可选择的数据结构是一个树形结构时，可以使用 TreeSelect，例如公司层级、学科系统、分类目录等等。

## API

### Tree props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| allowClear | 显示清除按钮 | boolean | false | 3.0.0 |
| autoClearSearchValue | 当多选模式下值被选择，自动清空搜索框 | boolean | true | 3.7.0 |
| defaultValue | 指定默认选中的条目 | string/string\[] | - | 3.0.0 |
| disabled | 是否禁用 | boolean | false | 3.0.0 |
| dropdownClassName | 下拉菜单的 className 属性 | string | - | 3.3.0 |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽。默认将设置 `min-width`。 | boolean | true | 3.0.0 |
| dropdownStyle | 下拉菜单的样式 | object | - | 3.0.0 |
| filterTreeNode | 是否根据输入项进行筛选，默认用 treeNodeFilterProp 的值作为要筛选的 TreeNode 的属性值 | boolean\|Function(inputValue: string, treeNode: TreeNode) (函数需要返回 bool 值) | Function | 3.0.0 |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codepen.io/afc163/pen/zEjNOy?editors=0010) | Function(triggerNode) | () => document.body | 3.0.0 |
| labelInValue | 是否把每个选项的 label 包装到 value 中，会把 value 类型从 `string` 变为 `{value: string, label: ReactNode, halfChecked(treeCheckStrictly 时有效): string[] }` 的格式 | boolean | false | 3.0.0 |
| loadData | 异步加载数据 | function(node) | - | 3.0.0 |
| maxTagCount | 最多显示多少个 tag | number | - | 3.7.0 |
| maxTagPlaceholder | 隐藏 tag 时显示的内容 | ReactNode/function(omittedValues) | - | 3.7.0 |
| multiple | 支持多选（当设置 treeCheckable 时自动变为 true） | boolean | false | 3.0.0 |
| placeholder | 选择框默认文字 | string | - | 3.0.0 |
| searchPlaceholder | 搜索框默认文字 | string | - | 3.0.0 |
| searchValue | 搜索框的值，可以通过 `onSearch` 获取用户输入 | string | - | 3.7.0 |
| treeIcon | 是否展示 TreeNode title 前的图标，没有默认样式，如设置为 true，需要自行定义图标相关样式 | boolean | false | 3.13.1 |
| showCheckedStrategy | 定义选中项回填的方式。`TreeSelect.SHOW_ALL`: 显示所有选中节点(包括父节点). `TreeSelect.SHOW_PARENT`: 只显示父节点(当父节点下所有子节点都选中时). 默认只显示子节点. | enum{TreeSelect.SHOW_ALL, TreeSelect.SHOW_PARENT, TreeSelect.SHOW_CHILD } | TreeSelect.SHOW_CHILD | 3.0.0 |
| showSearch | 是否支持搜索框 | boolean | 单选：`false` \| 多选：`true` | 3.0.0 |
| size | 选择框大小，可选 `large` `small` | string | 'default' | 3.0.0 |
| suffixIcon | 自定义的选择框后缀图标 | ReactNode | - | 3.10.0 |
| treeCheckable | 显示 checkbox | boolean | false | 3.0.0 |
| treeCheckStrictly | checkable 状态下节点选择完全受控（父子节点选中状态不再关联），会使得 `labelInValue` 强制为 true | boolean | false | 3.0.0 |
| treeData | treeNodes 数据，如果设置则不需要手动构造 TreeNode 节点（value 在整个树范围内唯一） | array\<{value, title, children, \[disabled, disableCheckbox, selectable]}> | \[] | 3.0.0 |
| treeDataSimpleMode | 使用简单格式的 treeData，具体设置参考可设置的类型 (此时 treeData 应变为这样的数据结构: \[{id:1, pId:0, value:'1', title:"test1",...},...], `pId` 是父节点的 id) | false\|object\<{ id: string, pId: string, rootPId: string }> | false | 3.0.0 |
| treeDefaultExpandAll | 默认展开所有树节点 | boolean | false | 3.0.0 |
| treeDefaultExpandedKeys | 默认展开的树节点 | string\[] | - | 3.0.0 |
| treeExpandedKeys | 设置展开的树节点 | string\[] | - | 3.10.0 |
| treeNodeFilterProp | 输入项过滤对应的 treeNode 属性 | string | 'value' | 3.0.0 |
| treeNodeLabelProp | 作为显示的 prop 设置 | string | 'title' | 3.0.0 |
| value | 指定当前选中的条目 | string/string\[] | - | 3.0.0 |
| onChange | 选中树节点时调用此函数 | function(value, label, extra) | - | 3.0.0 |
| onSearch | 文本框值变化时回调 | function(value: string) | - | 3.0.0 |
| onSelect | 被选中时调用 | function(value, node, extra) | - | 3.0.0 |
| onTreeExpand | 展示节点时调用 | function(expandedKeys) | - | 3.10.0 |

### Tree 方法

| 名称    | 描述     | 版本  |
| ------- | -------- | ----- |
| blur()  | 移除焦点 | 3.0.0 |
| focus() | 获取焦点 | 3.0.0 |

### TreeNode props

> 建议使用 treeData 来代替 TreeNode，免去手工构造麻烦

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| selectable | 是否可选 | boolean | true | 3.9.3 |
| disableCheckbox | 禁掉 checkbox | boolean | false | 3.0.0 |
| disabled | 是否禁用 | boolean | false | 3.0.0 |
| isLeaf | 是否是叶子节点 | boolean | false | 3.0.0 |
| key | 此项必须设置（其值在整个树范围内唯一） | string | - | 3.0.0 |
| title | 树节点显示的内容 | string\|ReactNode | '---' | 3.0.0 |
| value | 默认根据此属性值进行筛选（其值在整个树范围内唯一） | string | - | 3.0.0 |

## FAQ

### onChange 时如何获得父节点信息？

从性能角度考虑，我们默认不透出父节点信息。你可以这样获得：<https://codesandbox.io/s/wk080nn81k>
