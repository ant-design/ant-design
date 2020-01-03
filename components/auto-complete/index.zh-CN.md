---
category: Components
subtitle: 自动完成
type: 数据录入
cols: 2
title: AutoComplete
---

输入框自动完成功能。

## 何时使用

需要自动完成时。

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| allowClear | 支持清除, 单选模式有效 | boolean | false |  |
| autoFocus | 自动获取焦点 | boolean | false |  |
| backfill | 使用键盘选择选项的时候把选中项回填到输入框中 | boolean | false |  |
| children (自定义输入框) | 自定义输入框 | HTMLInputElement <br /><br /> HTMLTextAreaElement <br /><br /> `React.ReactElement<InputProps>` | `<Input />` |  |
| children (自动完成的数据源) | 自动完成的数据源 | `React.ReactElement<OptionProps>` <br /><br /> `Array<React.ReactElement<OptionProps>>` | - |  |
| defaultActiveFirstOption | 是否默认高亮第一个选项。 | boolean | true |  |
| defaultValue | 指定默认选中的条目 | string\|string\[]\| 无 |  |
| disabled | 是否禁用 | boolean | false |  |
| filterOption | 是否根据输入项进行筛选。当其为一个函数时，会接收 `inputValue` `option` 两个参数，当 `option` 符合筛选条件时，应返回 `true`，反之则返回 `false`。 | boolean or function(inputValue, option) | true |  |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codesandbox.io/s/4j168r7jw0) | Function(triggerNode) | () => document.body |  |
| optionLabelProp | 回填到选择框的 Option 的属性值，默认是 Option 的子元素。比如在子元素需要高亮效果时，此值可以设为 `value`。 | string | `children` |  |
| placeholder | 输入框提示 | string | - |  |
| value | 指定当前选中的条目 | string\|string\[]\|{ key: string, label: string\|ReactNode }\|Array&lt;{ key: string, label: string\|ReactNode }> | 无 |  |
| onBlur | 失去焦点时的回调 | function() | - |  |
| onChange | 选中 option，或 input 的 value 变化时，调用此函数 | function(value) | 无 |  |
| onFocus | 获得焦点时的回调 | function() | - |  |
| onSearch | 搜索补全项的时候调用 | function(value) | 无 |  |
| onSelect | 被选中时调用，参数为选中项的 value 值 | function(value, option) | 无 |  |
| defaultOpen | 是否默认展开下拉菜单 | boolean | - |  |
| open | 是否展开下拉菜单 | boolean | - |  |
| onDropdownVisibleChange | 展开下拉菜单的回调 | function(open) | - |  |

## 方法

| 名称    | 描述     | 版本 |
| ------- | -------- | ---- |
| blur()  | 移除焦点 |      |
| focus() | 获取焦点 |      |

## FAQ

### 为何受控状态下使用 onSearch 无法输入中文？

请使用 `onChange` 进行受控管理。`onSearch` 触发于搜索输入，与 `onChange` 时机不同。此外，点选选项时也不会触发 `onSearch` 事件。

相关 issue：[#18230](https://github.com/ant-design/ant-design/issues/18230) [#17916](https://github.com/ant-design/ant-design/issues/17916)
