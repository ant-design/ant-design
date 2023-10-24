---
category: Components
subtitle: 滑动输入条
group: 数据录入
title: Slider
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*_4heQaUrFn4AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*XkgXTaudeosAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

滑动型输入器，展示当前值和可选范围。

## 何时使用

当用户需要在数值区间/自定义区间内进行选择时，可为连续或离散值。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本</code>
<code src="./demo/input-number.tsx">带输入框的滑块</code>
<code src="./demo/icon-slider.tsx">带 icon 的滑块</code>
<code src="./demo/tip-formatter.tsx">自定义提示</code>
<code src="./demo/event.tsx">事件</code>
<code src="./demo/mark.tsx">带标签的滑块</code>
<code src="./demo/vertical.tsx">垂直</code>
<code src="./demo/show-tooltip.tsx">控制 ToolTip 的显示</code>
<code src="./demo/reverse.tsx">反向</code>
<code src="./demo/draggableTrack.tsx">范围可拖拽</code>
<code src="./demo/multiple.tsx">多点组合</code>
<code src="./demo/component-token.tsx" debug>组件 Token</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autoFocus | 自动获取焦点 | boolean | false |  |
| classNames | 语义化结构 className | Record<SemanticDOM, string> | - | 5.10.0 |
| defaultValue | 设置初始取值。当 `range` 为 false 时，使用 number，否则用 \[number, number] | number \| \[number, number] | 0 \| \[0, 0] |  |
| disabled | 值为 true 时，滑块为禁用状态 | boolean | false |  |
| keyboard | 支持使用键盘操作 handler | boolean | true | 5.2.0+ |
| dots | 是否只能拖拽到刻度上 | boolean | false |  |
| included | `marks` 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列 | boolean | true |  |
| marks | 刻度标记，key 的类型必须为 `number` 且取值在闭区间 \[min, max] 内，每个标签可以单独设置样式 | object | { number: ReactNode } or { number: { style: CSSProperties, label: ReactNode } } |  |
| max | 最大值 | number | 100 |  |
| min | 最小值 | number | 0 |  |
| range | 双滑块模式 | boolean \| [range](#range) | false |  |
| reverse | 反向坐标轴 | boolean | false |  |
| step | 步长，取值必须大于 0，并且可被 (max - min) 整除。当 `marks` 不为空对象时，可以设置 `step` 为 null，此时 Slider 的可选值仅有 marks 标出来的部分 | number \| null | 1 |  |
| styles | 语义化结构 className | Record<SemanticDOM, React.CSSProperties> | - | 5.10.0 |
| tooltip | 设置 Tooltip 相关属性 | [tooltip](#tooltip) | - | 4.23.0 |
| value | 设置当前取值。当 `range` 为 false 时，使用 number，否则用 \[number, number] | number \| \[number, number] | - |  |
| vertical | 值为 true 时，Slider 为垂直方向 | boolean | false |  |
| onAfterChange | 与 `onmouseup` 触发时机一致，把当前值作为参数传入 | (value) => void | - |  |
| onChange | 当 Slider 的值发生改变时，会触发 onChange 事件，并把改变后的值作为参数传入 | (value) => void | - |  |

### `styles` 和 `classNames` 属性

| 名称   | 说明                             | 版本   |
| ------ | -------------------------------- | ------ |
| track  | 范围选择下，点和点之间单个选取条 | 5.10.0 |
| tracks | 范围选择下，整个范围选取条       | 5.10.0 |
| rail   | 背景条                           | 5.10.0 |
| handle | 抓取点                           | 5.10.0 |

### range

| 参数           | 说明                 | 类型    | 默认值 | 版本   |
| -------------- | -------------------- | ------- | ------ | ------ |
| draggableTrack | 范围刻度是否可被拖拽 | boolean | false  | 4.10.0 |

### tooltip

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autoAdjustOverflow | 是否自动调整弹出位置 | boolean | true | 5.8.0 |
| open | 值为 true 时，Tooltip 将会始终显示；否则始终不显示，哪怕在拖拽及移入时 | boolean | - | 4.23.0 |
| placement | 设置 Tooltip 展示位置。参考 [Tooltip](/components/tooltip-cn) | string | - | 4.23.0 |
| getPopupContainer | Tooltip 渲染父节点，默认渲染到 body 上 | (triggerNode) => HTMLElement | () => document.body | 4.23.0 |
| formatter | Slider 会把当前值传给 `formatter`，并在 Tooltip 中显示 `formatter` 的返回值，若为 null，则隐藏 Tooltip | value => ReactNode \| null | IDENTITY | 4.23.0 |

## 方法

| 名称    | 描述     | 版本 |
| ------- | -------- | ---- |
| blur()  | 移除焦点 |      |
| focus() | 获取焦点 |      |

## 主题变量（Design Token）

<ComponentTokenTable component="Slider"></ComponentTokenTable>
