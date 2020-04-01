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

| 属性          | 说明                     | 类型                    | 默认值                 |
| ------------- | ------------------------ | ----------------------- | ---------------------- |
| allowClear    | 是否允许再次点击后清除   | boolean                 | true                   |
| allowHalf     | 是否允许半选             | boolean                 | false                  |
| autoFocus     | 自动获取焦点             | boolean                 | false                  |
| character     | 自定义字符               | ReactNode               | `<Icon type="star" />` |
| className     | 自定义样式类名           | string                  |                        |
| count         | star 总数                | number                  | 5                      |
| defaultValue  | 默认值                   | number                  | 0                      |
| disabled      | 只读，无法进行交互       | boolean                 | false                  |
| style         | 自定义样式对象           | object                  |                        |
| tooltips      | 自定义每项的提示信息     | string\[]               |                        |
| value         | 当前数，受控值           | number                  |                        |
| onBlur        | 失去焦点时的回调         | Function()              |                        |
| onChange      | 选择时的回调             | Function(value: number) |                        |
| onFocus       | 获取焦点时的回调         | Function()              |                        |
| onHoverChange | 鼠标经过时数值变化的回调 | Function(value: number) |                        |
| onKeyDown     | 按键回调                 | Function(event)         |                        |

## 方法

| 名称    | 描述     |
| ------- | -------- |
| blur()  | 移除焦点 |
| focus() | 获取焦点 |
