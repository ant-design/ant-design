---
category: Components
subtitle: 评分
type: 数据录入
title: Rate
---

评分组件。

## 何时使用

- 对评价进行展示。
- 对事物进行快速的评级操作。

## API

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| allowClear | 是否允许再次点击后清除 | boolean | true | 3.1.0 |
| allowHalf | 是否允许半选 | boolean | false | 3.0.0 |
| autoFocus | 自动获取焦点 | boolean | false | 3.0.0 |
| character | 自定义字符 | ReactNode | `<Icon type="star" />` | 3.0.0 |
| className | 自定义样式类名 | string | - | 3.0.0 |
| count | star 总数 | number | 5 | 3.0.0 |
| defaultValue | 默认值 | number | 0 | 3.0.0 |
| disabled | 只读，无法进行交互 | boolean | false | 3.0.0 |
| style | 自定义样式对象 | object | - | 3.0.0 |
| tooltips | 自定义每项的提示信息 | string\[] | - | 3.12.0 |
| value | 当前数，受控值 | number | - | 3.0.0 |
| onBlur | 失去焦点时的回调 | Function() | - | 3.0.0 |
| onChange | 选择时的回调 | Function(value: number) | - | 3.0.0 |
| onFocus | 获取焦点时的回调 | Function() | - | 3.0.0 |
| onHoverChange | 鼠标经过时数值变化的回调 | Function(value: number) | - | 3.0.0 |
| onKeyDown | 按键回调 | Function(event) | - | 3.0.0 |

## 方法

| 名称    | 描述     | 版本  |
| ------- | -------- | ----- |
| blur()  | 移除焦点 | 3.0.0 |
| focus() | 获取焦点 | 3.0.0 |
