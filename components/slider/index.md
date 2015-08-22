# Slider

- category: Components
- chinese: 滑动输入条
- type: 表单

---

滑动型输入器，展示当前值和可选范围。

## 何时使用

当用户需要在数值区间/自定义区间内进行选择时，输入值可为连续或离散值。

## API

| 参数       | 类型            | 默认值       |说明           |
|------------|----------------|-------------|--------------|
| min        | Number			| 0				| 最小值
| max        | Number			| 100           | 最大值
| step       | Number			| 1				| 步长，取值必须大于 0，并且可被 (max - min) 整除
| value      | Number 			|            	| 当前取值
| defaultValue      | Number 			| 0           	| 初始取值
| marks      | Array		    | [] 			| 分段标记，标记每一个 step，如果 step 属性没有定义，则 `marks` 属性会被忽略
| isIncluded | Boolean			| true			| 分段式滑块，值为 true 时表示值为包含关系，false 表示并列
| index      | Number 			|            	| 为具备 `step` 或者 `marks` 的 slider 提供滑块操作的当前位置
| defaultIndex      | Number 			| 0           	| 为具备 `step` 或者 `marks` 的 slider 提供滑块操作的初始位置
| disabled   | Boolean 			| false         | 值为 `true` 时，滑块为 disable 禁用状态
