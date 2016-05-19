---
category: Components
chinese: 选择器
type: Form Control
english: Select
---

类似 Select2 的选择器。

## 何时使用

弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。

```html
<Select>
  <Option value="lucy">lucy</Option>
</Select>
```

## API

### Select props

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| value    | 指定当前选中的条目 | String/Array<String>/{key: String, label: React.Node}/Array<{key, label}>   |  无  |
| defaultValue | 指定默认选中的条目 | String/Array<String>/{key: String, label: React.Node}/Array<{key, label}>   |  无  |
| multiple   | 支持多选 | boolean | false |
| allowClear   | 支持清除, 单选模式有效 | boolean | false |
| filterOption | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。 | boolean or function(inputValue, option) | true     |
| tags | 可以把随意输入的条目作为 tag，输入项不需要与下拉选项匹配 | boolean |false |
| onSelect | 被选中时调用，参数为选中项的 value 值 | function(value, option) | 无   |
| onDeselect | 取消选中时调用，参数为选中项的 option value 值，仅在 multiple 或 tags 模式下生效 |  function(value) | 无   |
| onChange | 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数 | function(value) | 无 |
| onSearch | 文本框值变化时回调 | function(value: String) |  |
| placeholder | 选择框默认文字 | string | 无 |
| notFoundContent | 当下拉列表为空时显示的内容 | string | 'Not Found' |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽 | boolean | true |
| optionFilterProp | 搜索时过滤对应的 option 属性，如设置为 children 表示对内嵌内容进行搜索 | string | value |
| optionLabelProp | 回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 `value`。 | string | `children` （combobox 模式下为 `value`） |
| combobox | 输入框自动提示模式 | boolean | false |
| size    | 选择框大小，可选 `large` `small`  | String      |      default      |
| showSearch | 在选择框中显示搜索框 | boolean | false |
| disabled | 是否禁用 | boolean | false |
| defaultActiveFirstOption | 是否默认高亮第一个选项。 | boolean | true
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](http://codepen.io/anon/pen/xVBOVQ?editors=001) | Function(triggerNode) | () => document.body |
| labelInValue | 是否把每个选项的 label 包装到 value 中，决定 Select 的 value 类型。 | boolean | false |

### Option props

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| disabled    | 是否禁用 | Boolean   |  false  |
| key   | 如果 react 需要你设置此项，此项值与 value 的值相同，然后可以省略 value 设置 |  String |  |
| value   | 默认根据此属性值进行筛选 | String | - |

### OptGroup props

| 参数     | 说明           | 类型     | 默认值          |
|----------|----------------|----------|-----------------|
| label    | 组名           | String/React.Element | 无  |
| key      |                |  String  | -               |
