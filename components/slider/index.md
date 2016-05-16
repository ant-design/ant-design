---
category: Components
chinese: 滑动输入条
type: Form Control
english: Slider
---

滑动型输入器，展示当前值和可选范围。

## 何时使用

当用户需要在数值区间/自定义区间内进行选择时，可为连续或离散值。

## API

| 参数       | 类型            | 默认值       |说明           |
|------------|----------------|-------------|--------------|
| range | Boolean          | false          | 双滑块模式
| min        | Number			| 0				| 最小值
| max        | Number			| 100           | 最大值
| step       | Number or null	| 1				| 步长，取值必须大于 0，并且可被 (max - min) 整除。当 `marks` 不为空对象时，可以设置 `step` 为 `null`，此时 Slider 的可选值仅有 marks 标出来的部分。
| marks      | Object{Number: String|React.Component} or Object{Number: { style, label}} | {} | 刻度标记，key 的类型必须为 `Number` 且取值在闭区间 [min, max] 内，每个标签可以单独设置样式
| dots       | Boolean | false | 是否只能拖拽到刻度上
| value             | Number or [Number, Number]|             | 设置当前取值。当 `range` 为 `false` 时，使用 `Number`，否则用 `[Number, Number]`
| defaultValue      | Number or [Number, Number]| 0 or [0, 0] | 设置初始取值。当 `range` 为 `false` 时，使用 `Number`，否则用 `[Number, Number]`
| included   | Boolean			| true			| `marks` 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列
| disabled   | Boolean 			| false         | 值为 `true` 时，滑块为禁用状态
| onChange   | Function         | NOOP          | 当 Slider 的值发生改变时，会触发 onChange 事件，并把改变后的值作为参数传入。
| onAfterChange | Function        | NOOP        | 与 `onmouseup` 触发时机一致，把当前值作为参数传入。
| tipFormatter | Function or null | IDENTITY    | Slider 会把当前值传给 `tipFormatter`，并在 Tooltip 中显示 `tipFormatter` 的返回值，若为 null，则隐藏 Tooltip。
