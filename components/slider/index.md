---
category: Components
chinese: 滑动输入条
type: Form Controls
english: Slider
---

滑动型输入器，展示当前值和可选范围。

## 何时使用

当用户需要在数值区间/自定义区间内进行选择时，可为连续或离散值。

## API

| 参数       | 说明            | 类型         | 默认值       |
|------------|----------------|-------------|--------------|
| range          | 双滑块模式 | Boolean          | false
| min            | 最小值 | Number			| 0
| max            | 最大值 | Number			| 100
| step           | 步长，取值必须大于 0，并且可被 (max - min) 整除。当 `marks` 不为空对象时，可以设置 `step` 为 `null`，此时 Slider 的可选值仅有 marks 标出来的部分。 | Number or null	| 1
| marks          | 刻度标记，key 的类型必须为 `Number` 且取值在闭区间 [min, max] 内，每个标签可以单独设置样式 | Object{} | Object{Number: String or React.Component} or Object{Number: { style, label}}
| dots           | 是否只能拖拽到刻度上 | Boolean | false
| value          | 设置当前取值。当 `range` 为 `false` 时，使用 `Number`，否则用 `[Number, Number]`   | Number or [Number, Number] |
| defaultValue   | 设置初始取值。当 `range` 为 `false` 时，使用 `Number`，否则用 `[Number, Number]`   | Number or [Number, Number] | 0 or [0, 0]
| included       | `marks` 不为空对象时有效，值为 true 时表示值为包含关系，false 表示并列 | Boolean			 | true
| disabled       | 值为 `true` 时，滑块为禁用状态 | Boolean 			| false
| onChange       | 当 Slider 的值发生改变时，会触发 onChange 事件，并把改变后的值作为参数传入。 | Function | NOOP
| onAfterChange  | 与 `onmouseup` 触发时机一致，把当前值作为参数传入。 | Function        | NOOP
| tipFormatter   | Slider 会把当前值传给 `tipFormatter`，并在 Tooltip 中显示 `tipFormatter` 的返回值，若为 null，则隐藏 Tooltip。 | Function or null | IDENTITY
