---
category: Components
chinese: 评分
type: Form Control
english: Rate
---

评分组件。

## 何时使用

- 对评价进行展示。
- 对事物进行快速的评级操作。

## API

| 属性        | 说明           | 类型               | 默认值       |
|------------|----------------|-------------------|-------------|
| count    | star 总数 | Number | 5 |
| value | 当前数，受控值 | Number | - |
| defaultValue | 默认值 | Number | 0 |
| onChange(value: Number) | 回调   | Function | - |
| allowHalf | 是否允许半选   | Boolean | false |
| disabled | 只读，无法进行交互 | Boolean | false |
