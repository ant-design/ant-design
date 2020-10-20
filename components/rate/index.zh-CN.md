---
category: Components
subtitle: 评分
type: 数据录入
title: Rate
cover: https://gw.alipayobjects.com/zos/alicdn/R5uiIWmxe/Rate.svg
---

评分组件。

## 何时使用

- 对评价进行展示。
- 对事物进行快速的评级操作。

## API

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| allowClear | 是否允许再次点击后清除 | boolean | true |  |
| allowHalf | 是否允许半选 | boolean | false |  |
| autoFocus | 自动获取焦点 | boolean | false |  |
| character | 自定义字符 | ReactNode \| (RateProps) => ReactNode | &lt;StarFilled /> | function(): 4.4.0 |
| className | 自定义样式类名 | string | - |  |
| count | star 总数 | number | 5 |  |
| defaultValue | 默认值 | number | 0 |  |
| disabled | 只读，无法进行交互 | boolean | false |  |
| onBlur | 失去焦点时的回调 | function() | - |  |
| onChange | 选择时的回调 | function(value: number) | - |  |
| onFocus | 获取焦点时的回调 | function() | - |  |
| onHoverChange | 鼠标经过时数值变化的回调 | function(value: number) | - |  |
| onKeyDown | 按键回调 | function(event) | - |  |
| style | 自定义样式对象 | CSSProperties | - |  |
| tooltips | 自定义每项的提示信息 | string\[] | - |  |
| value | 当前数，受控值 | number | - |  |

## 方法

| 名称    | 描述     |
| ------- | -------- |
| blur()  | 移除焦点 |
| focus() | 获取焦点 |
