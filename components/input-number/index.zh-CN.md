---
category: Components
subtitle: 数字输入框
type: 数据录入
title: InputNumber
cover: https://gw.alipayobjects.com/zos/alicdn/XOS8qZ0kU/InputNumber.svg
---

通过鼠标或键盘，输入范围内的数值。

## 何时使用

当需要获取标准数值时。

## API

属性如下

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autoFocus | 自动获取焦点 | boolean | false |
| defaultValue | 初始值 | number | - |
| disabled | 禁用 | boolean | false |
| readOnly | 只读 | boolean | false |
| formatter | 指定输入框展示值的格式 | function(value: number \| string): string | - |
| max | 最大值 | number | [Number.MAX_SAFE_INTEGER](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) |
| min | 最小值 | number | [Number.MIN_SAFE_INTEGER](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER) |
| parser | 指定从 `formatter` 里转换回数字的方式，和 `formatter` 搭配使用 | function(string): number | - |
| precision | 数值精度 | number | - |
| decimalSeparator | 小数点 | string | - |
| size | 输入框大小 | `large` \| `middle` \| `small` | - |
| step | 每次改变步数，可以为小数 | number \| string | 1 |
| value | 当前值 | number | - |
| onChange | 变化回调 | Function(value: number \| string) | - |
| onPressEnter | 按下回车的回调 | function(e) | - |

## 方法

| 名称    | 描述     |
| ------- | -------- |
| blur()  | 移除焦点 |
| focus() | 获取焦点 |
