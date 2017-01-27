---
category: Components
subtitle: 自动完成
type: Data Entry
cols: 1
title: AutoComplete
---

输入框自动完成功能。

## 何时使用

需要自动完成时。

## API

```jsx
const dataSource = ['12345', '23456', '34567'];
<AutoComplete dataSource={dataSource} />
```
因为 `AutoComplete` 是基于 `Select` 封装的，所以除了以下 API 外，`AutoComplete` 跟 `Select` 拥有一样的 API。

| 参数           | 说明                             | 类型        | 默认值 |
|----------------|----------------------------------|------------|---------|
| dataSource          | 自动完成的数据源 | [DataSourceItemType](https://git.io/vMMKF)[]     |         |
| value    | 指定当前选中的条目 | string\|string[]\|{ key: string, label: string\|ReactNode }\|Array<{ key: string, label: string\|ReactNode }>   |  无  |
| defaultValue | 指定默认选中的条目 | string\|string[]\|{ key: string, label: string\|ReactNode }\|Array<{ key: string, label: string\|ReactNode}>   |  无  |
| allowClear   | 支持清除, 单选模式有效 | boolean | false |
| onChange | 选中 option，或 input 的 value 变化时，调用此函数 | function(value) | 无 |
| onSelect | 被选中时调用，参数为选中项的 value 值	| function(value, option)	| 无 |
| disabled | 是否禁用 | boolean | false |
| placeholder | 输入框提示 | string | - |
| children (自动完成的数据源) | 自动完成的数据源 | React.ReactElement<OptionProps> / Array<React.ReactElement<OptionProps>> | - |
| children (自定义输入框) | 自定义输入框 |  HTMLInputElement / HTMLTextAreaElement / React.ReactElement<InputProps> | `<Input />` |
| optionLabelProp | 回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 `value`。 | string | `children` |
