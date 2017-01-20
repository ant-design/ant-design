---
category: Components
subtitle: 选择器
type: Data Entry
title: Select
---

类似 Select2 的选择器。

## 何时使用

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
- 当选项少时（少于 5 项），建议直接将选项平铺，使用 [Radio](/components/radio/) 是更好的选择。

## API

```html
<Select>
  <Option value="lucy">lucy</Option>
</Select>
```

### Select props

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| value    | 指定当前选中的条目 | string\|string[] |  -  |
| defaultValue | 指定默认选中的条目 | string\|string[] |  -  |
| multiple   | 支持多选 | boolean | false |
| allowClear   | 支持清除, 单选模式有效 | boolean | false |
| filterOption | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。 | boolean or function(inputValue, option) | true     |
| tags | 可以把随意输入的条目作为 tag，输入项不需要与下拉选项匹配 | boolean |false |
| onSelect | 被选中时调用，参数为选中项的 value (或 key) 值 | function(value, option) | -   |
| onDeselect | 取消选中时调用，参数为选中项的 value (或 key) 值，仅在 multiple 或 tags 模式下生效 |  function(value) | -   |
| onChange | 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数 | function(value) | - |
| onSearch | 文本框值变化时回调 | function(value: string) |  |
| onBlur | 失去焦点的时回调 | function | - |
| onFocus | 获得焦点时回调 | function | - |
| placeholder | 选择框默认文字 | string | - |
| notFoundContent | 当下拉列表为空时显示的内容 | string | 'Not Found' |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽 | boolean | true |
| optionFilterProp | 搜索时过滤对应的 option 属性，如设置为 children 表示对内嵌内容进行搜索 | string | value |
| optionLabelProp | 回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 `value`。 | string | `children` （combobox 模式下为 `value`） |
| combobox | 输入框自动提示模式 | boolean | false |
| size    | 选择框大小，可选 `large` `small`  | string      |      default      |
| showSearch | 在选择框中显示搜索框 | boolean | false |
| disabled | 是否禁用 | boolean | false |
| defaultActiveFirstOption | 是否默认高亮第一个选项。 | boolean | true
| dropdownStyle | 下拉菜单的 style 属性 | object | - |
| dropdownClassName | 下拉菜单的 className 属性 | string | - |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](http://codepen.io/anon/pen/xVBOVQ?editors=001) | Function(triggerNode) | () => document.body |
| labelInValue | 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 `string` 变为 `{key: string, label: ReactNode}` 的格式 | boolean | false |
| tokenSeparators | 在 tags 和 multiple 模式下自动分词的分隔符 | string[] |  |

### Option props

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| disabled    | 是否禁用 | boolean   |  false  |
| value | 默认根据此属性值进行筛选 | string | - |
| key   | 和 value 含义一致。如果 React 需要你设置此项，此项值与 value 的值相同，然后可以省略 value 设置 | string |  |
| title | 选中该 Option 后，Select 的 title | string | - |

### OptGroup props

| 参数     | 说明           | 类型     | 默认值          |
|----------|----------------|----------|-----------------|
| label    | 组名           | string\|React.Element | 无  |
| key      |                |  string  | -               |
