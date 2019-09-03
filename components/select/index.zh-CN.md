---
category: Components
subtitle: 选择器
type: 数据录入
title: Select
---

下拉选择器。

## 何时使用

- 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
- 当选项少时（少于 5 项），建议直接将选项平铺，使用 [Radio](/components/radio/) 是更好的选择。

## API

```jsx
<Select>
  <Select.Option value="lucy">lucy</Select.Option>
</Select>
```

### Select props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| allowClear | 支持清除 | boolean | false |  |
| autoClearSearchValue | 是否在选中项后清空搜索框，只在 `mode` 为 `multiple` 或 `tags` 时有效。 | boolean | true | 3.10.0 |
| autoFocus | 默认获取焦点 | boolean | false |  |
| defaultActiveFirstOption | 是否默认高亮第一个选项。 | boolean | true |  |
| defaultValue | 指定默认选中的条目 | string\|string\[]\<br />number\|number\[]\<br />LabeledValue\|LabeledValue[] | - |  |
| disabled | 是否禁用 | boolean | false |  |
| dropdownClassName | 下拉菜单的 className 属性 | string | - |  |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽 | boolean | true |  |
| dropdownRender | 自定义下拉框内容 | (menuNode: ReactNode, props) => ReactNode | - | 3.11.0 |
| dropdownStyle | 下拉菜单的 style 属性 | object | - |  |
| filterOption | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。 | boolean or function(inputValue, option) | true |  |
| firstActiveValue | 默认高亮的选项 | string\|string\[] | - |  |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codesandbox.io/s/4j168r7jw0) | Function(triggerNode) | () => document.body |  |
| labelInValue | 是否把每个选项的 label 包装到 value 中，会把 Select 的 value 类型从 `string` 变为 `{key: string, label: ReactNode}` 的格式 | boolean | false |  |
| maxTagCount | 最多显示多少个 tag | number | - |  |
| maxTagTextLength | 最大显示的 tag 文本长度 | number | - | 3.18.0 |
| maxTagPlaceholder | 隐藏 tag 时显示的内容 | ReactNode/function(omittedValues) | - |  |
| mode | 设置 Select 的模式为多选或标签 | 'multiple' \| 'tags' | - |  |
| notFoundContent | 当下拉列表为空时显示的内容 | string | 'Not Found' |  |
| optionFilterProp | 搜索时过滤对应的 option 属性，如设置为 children 表示对内嵌内容进行搜索。[示例](https://codesandbox.io/s/antd-reproduction-template-tk678) | string | value |  |
| optionLabelProp | 回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 `value`。 | string | `children` （combobox 模式下为 `value`） |  |
| placeholder | 选择框默认文字 | string | - |  |
| searchValue | 搜索框文本 | string | - | 3.23.2 |
| showArrow | 是否显示下拉小箭头 | boolean | true | 3.2.1 |
| showSearch | 使单选模式可搜索 | boolean | false |  |
| size | 选择框大小，可选 `large` `small` | string | default |  |
| suffixIcon | 自定义的选择框后缀图标 | ReactNode | - | 3.10.0 |
| removeIcon | 自定义的多选框清除图标 | ReactNode | - | 3.11.0 |
| clearIcon | 自定义的多选框清空图标 | ReactNode | - | 3.11.0 |
| menuItemSelectedIcon | 自定义多选时当前选中的条目图标 | ReactNode | - | 3.11.0 |
| tokenSeparators | 在 tags 和 multiple 模式下自动分词的分隔符 | string\[] |  |  |
| value | 指定当前选中的条目 | string\|string\[]\<br />number\|number\[]\<br />LabeledValue\|LabeledValue[] | - |  |
| onBlur | 失去焦点时回调 | function | - |  |
| onChange | 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数 | function(value, option:Option/Array&lt;Option>) | - |  |
| onDeselect | 取消选中时调用，参数为选中项的 value (或 key) 值，仅在 multiple 或 tags 模式下生效 | function(string\|number\|LabeledValue) | - |  |
| onFocus | 获得焦点时回调 | function | - |  |
| onInputKeyDown | 按键按下时回调 | function | - | 3.1.0 |
| onMouseEnter | 鼠标移入时回调 | function | - |  |
| onMouseLeave | 鼠标移出时回调 | function | - |  |
| onPopupScroll | 下拉列表滚动时的回调 | function | - |  |
| onSearch | 文本框值变化时回调 | function(value: string) |  |  |
| onSelect | 被选中时调用，参数为选中项的 value (或 key) 值 | function(string\|number\|LabeledValue, option:Option) | - |  |
| defaultOpen | 是否默认展开下拉菜单 | boolean | - | 3.9.3 |
| open | 是否展开下拉菜单 | boolean | - | 3.9.0 |
| onDropdownVisibleChange | 展开下拉菜单的回调 (3.9.0 后支持) | function(open) | - | 3.9.0 |
| loading | 加载中状态 | Boolean | false | 3.11.0 |

> 注意，如果发现下拉菜单跟随页面滚动，或者需要在其他弹层中触发 Select，请尝试使用 `getPopupContainer={triggerNode => triggerNode.parentElement}` 将下拉弹层渲染节点固定在触发器的父元素中。

### Select Methods

| 名称    | 说明     | 版本 |
| ------- | -------- | ---- |
| blur()  | 取消焦点 |      |
| focus() | 获取焦点 |      |

### Option props

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| disabled | 是否禁用 | boolean | false |  |
| key | 和 value 含义一致。如果 React 需要你设置此项，此项值与 value 的值相同，然后可以省略 value 设置 | string |  |  |
| title | 选中该 Option 后，Select 的 title | string | - |  |
| value | 默认根据此属性值进行筛选 | string\|number | - |  |
| className | Option 器类名 | string | - | 3.10.1 |

### OptGroup props

| 参数  | 说明 | 类型                  | 默认值 | 版本 |
| ----- | ---- | --------------------- | ------ | ---- |
| key   |      | string                | -      |      |
| label | 组名 | string\|React.Element | 无     |      |
