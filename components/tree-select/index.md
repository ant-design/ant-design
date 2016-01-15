# TreeSelect

- category: Components
- chinese: 树选择
- type: 表单

---

树型选择控件。

## 何时使用

类似 Select 的选择控件，可选择的数据结构是一个树形结构时，可以使用 TreeSelect，例如公司层级、学科系统、分类目录等等。

## API

### Tree props

| 参数       | 说明                                      | 类型       | 默认值 |
|-----------|------------------------------------------|------------|--------|
| value    | 指定当前选中的条目 | string/Array<String>   |  无  |
| defaultValue | 指定默认选中的条目 | string/Array<String>   |  无  |
| multiple   | 支持多选 | boolean | false |
| tags | 可以把随意输入的条目作为 tag，输入项不需要与下拉选项匹配 | boolean |false |
| onSelect | 被选中时调用，参数为选中项的 value 值 | function(value) | 无   |
| onChange | 选中option，或input的value变化(combobox 模式下)时，调用此函数 | function(value, label) | 无 |
| allowClear | 显示清除按钮 | boolean | false |
| onSearch | 文本框值变化时回调 | function(value: String) |  |
| placeholder | 选择框默认文字 | string | 无 |
| searchPlaceholder | 搜索框默认文字 | string | 无 |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽 | boolean | true |
| combobox | 输入框自动提示模式 | boolean | false |
| size    | 选择框大小，可选 `large` `small`  | String      |      default      |
| showSearch | 在下拉中显示搜索框 | boolean | false |
| disabled | 是否禁用 | boolean | false |
| treeDefaultExpandAll | 默认展开所有树节点 | bool | false |
| treeCheckable | 显示checkbox | bool | false |
| filterTreeNode | 是否根据输入项进行筛选，返回值true | function(treeNode) | - |
| treeNodeFilterProp | 输入项过滤对应的 treeNode 属性 | String | 'value' |
| treeNodeLabelProp | 作为显示的prop设置 | String | 'title' |
| loadData | 异步加载数据 | function(node) | - |

### TreeNode props

| 参数       | 说明                                      | 类型       | 默认值 |
|-----------|------------------------------------------|------------|--------|
| disabled    | 是否禁用 | Boolean   |  false  |
| key   | 此项必须设置 |  String |  |
| value   | 默认根据此属性值进行筛选 | String | - |
| title | 树节点显示的内容 | String | '---' |
| isLeaf | 是否是叶子节点 | bool | false |
