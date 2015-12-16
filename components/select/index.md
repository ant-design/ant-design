# Select

- category: Components
- chinese: 选择器
- type: 表单

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
| value    | 指定当前选中的条目 | string/Array<String>   |  无  |
| defaultValue | 指定默认选中的条目 | string/Array<String>   |  无  |
| multiple   | 支持多选 | boolean | false |
| filterOption | 是否根据输入项进行筛选 | boolean | true     |
| tags | 可以把随意输入的条目作为 tag，输入项不需要与下拉选项匹配 | boolean |false |
| onSelect | 被选中时调用，参数为选中项的 value 值 | function(value, option) | 无   |
| onDeselect | 取消选中时调用，参数为选中项的 option value 值，仅在 multiple 或 tags 模式下生效 |  function(value, option) | 无   |
| onChange | 选中option，或input的value变化(combobox 模式下)时，调用此函数 | function(value, label) | 无 |
| allowClear | 显示清除按钮 | boolean | false |
| onSearch | 文本框值变化时回调 | function(value: String) |  |
| placeholder | 选择框默认文字 | string | 无 |
| searchPlaceholder | 搜索框默认文字 | string | 无 |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽 | boolean | true |
| optionFilterProp | 输入项过滤对应的 option 属性 | string | value |
| combobox | 输入框自动提示模式 | boolean | false |
| size    | 选择框大小，可选 `large` `small`  | String      |      default      |
| showSearch | 在下拉中显示搜索框 | boolean | false |
| disabled | 是否禁用 | boolean | false |

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
