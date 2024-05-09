---
category: Components
group: 数据录入
title: InputNumber
subtitle: 数字输入框
description: 通过鼠标或键盘，输入范围内的数值。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*JvWbSYhuNlIAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*1uH-R5kLAMIAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用

当需要获取标准数值时。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本</code>
<code src="./demo/size.tsx">三种大小</code>
<code src="./demo/addon.tsx">前置/后置标签</code>
<code src="./demo/disabled.tsx">不可用</code>
<code src="./demo/digit.tsx">高精度小数</code>
<code src="./demo/formatter.tsx">格式化展示</code>
<code src="./demo/keyboard.tsx">键盘行为</code>
<code src="./demo/change-on-wheel.tsx" version="5.14.0">鼠标滚轮</code>
<code src="./demo/variant.tsx" version="5.13.0">形态变体</code>
<code src="./demo/filled-debug.tsx" debug>Filled Debug</code>
<code src="./demo/out-of-range.tsx">超出边界</code>
<code src="./demo/prefix.tsx">前缀</code>
<code src="./demo/status.tsx">自定义状态</code>
<code src="./demo/controls.tsx" debug>图标按钮</code>
<code src="./demo/render-panel.tsx" debug>_InternalPanelDoNotUseOrYouWillBeFired</code>
<code src="./demo/debug-token.tsx" debug>覆盖组件样式</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| addonAfter | 带标签的 input，设置后置标签 | ReactNode | - | 4.17.0 |
| addonBefore | 带标签的 input，设置前置标签 | ReactNode | - | 4.17.0 |
| autoFocus | 自动获取焦点 | boolean | false | - |
| changeOnBlur | 是否在失去焦点时，触发 `onChange` 事件（例如值超出范围时，重新限制回范围并触发事件） | boolean | true | 5.11.0 |
| changeOnWheel | 允许鼠标滚轮改变数值 | boolean | - | 5.14.0 |
| controls | 是否显示增减按钮，也可设置自定义箭头图标 | boolean \| { upIcon?: React.ReactNode; downIcon?: React.ReactNode; } | - | 4.19.0 |
| decimalSeparator | 小数点 | string | - | - |
| placeholder | 占位符 | string | - |  |
| defaultValue | 初始值 | number | - | - |
| disabled | 禁用 | boolean | false | - |
| formatter | 指定输入框展示值的格式 | function(value: number \| string, info: { userTyping: boolean, input: string }): string | - | info: 4.17.0 |
| keyboard | 是否启用键盘快捷行为 | boolean | true | 4.12.0 |
| max | 最大值 | number | [Number.MAX_SAFE_INTEGER](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) | - |
| min | 最小值 | number | [Number.MIN_SAFE_INTEGER](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER) | - |
| parser | 指定从 `formatter` 里转换回数字的方式，和 `formatter` 搭配使用 | function(string): number | - | - |
| precision | 数值精度，配置 `formatter` 时会以 `formatter` 为准 | number | - | - |
| readOnly | 只读 | boolean | false | - |
| status | 设置校验状态 | 'error' \| 'warning' | - | 4.19.0 |
| prefix | 带有前缀图标的 input | ReactNode | - | 4.17.0 |
| size | 输入框大小 | `large` \| `middle` \| `small` | - | - |
| step | 每次改变步数，可以为小数 | number \| string | 1 | - |
| stringMode | 字符值模式，开启后支持高精度小数。同时 `onChange` 将返回 string 类型 | boolean | false | 4.13.0 |
| value | 当前值 | number | - | - |
| variant | 形态变体 | `outlined` \| `borderless` \| `filled` | `outlined` | 5.13.0 |
| onChange | 变化回调 | function(value: number \| string \| null) | - | - |
| onPressEnter | 按下回车的回调 | function(e) | - | - |
| onStep | 点击上下箭头的回调 | (value: number, info: { offset: number, type: 'up' \| 'down' }) => void | - | 4.7.0 |

## 方法

| 名称    | 描述     |
| ------- | -------- |
| blur()  | 移除焦点 |
| focus() | 获取焦点 |

## 主题变量（Design Token）

<ComponentTokenTable component="InputNumber"></ComponentTokenTable>

## FAQ

### 为何受控模式下，`value` 可以超出 `min` 和 `max` 范围？

在受控模式下，开发者可能自行存储相关数据。如果组件将数据约束回范围内，会导致展示数据与实际存储数据不一致的情况。这使得一些如表单场景存在潜在的数据问题。

### 为何动态修改 `min` 和 `max` 让 `value` 超出范围不会触发 `onChange` 事件？

`onChange` 事件为用户触发事件，自行触发会导致表单库误以为变更来自用户操作。我们以错误样式展示超出范围的数值。

### 为何 `onBlur` 等事件获取不到正确的 value？

InputNumber 的值由内部逻辑封装而成，通过 `onBlur` 等事件获取的 `event.target.value` 仅为 DOM 元素的 `value` 而非 InputNumber 的实际值。例如通过 `formatter` 或者 `decimalSeparator` 更改展示格式，DOM 中得到的就是格式化后的字符串。你总是应该通过 `onChange` 获取当前值。

### 为何 `changeOnWheel` 无法控制鼠标滚轮是否改变数值？

> 不建议使用 `type` 属性

InputNumber 组件允许你使用 input 元素的所有属性最终透传至 input 元素，当你传入 `type="number"` 时 input 元素也会添加这个属性，这会使 input 元素触发原生特性（允许鼠标滚轮改变数值），从而导致 `changeOnWheel` 无法控制鼠标滚轮是否改变数值。
