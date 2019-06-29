---
category: Components
subtitle: 数字输入框
type: 数据录入
title: InputNumber
---

通过鼠标或键盘，输入范围内的数值。

## 何时使用

当需要获取标准数值时。

## API

属性如下

| 成员 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autoFocus | 自动获取焦点 | boolean | false | 3.0.0 |
| defaultValue | 初始值 | number |  | 3.0.0 |
| disabled | 禁用 | boolean | false | 3.0.0 |
| formatter | 指定输入框展示值的格式 | function(value: number \| string): string | - | 3.0.0 |
| max | 最大值 | number | Infinity | 3.0.0 |
| min | 最小值 | number | -Infinity | 3.0.0 |
| parser | 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用 | function( string): number | - | 3.0.0 |
| precision | 数值精度 | number | - | 3.0.0 |
| decimalSeparator | 小数点 | string | - | 3.10.0 |
| size | 输入框大小 | string | 无 | 3.0.0 |
| step | 每次改变步数，可以为小数 | number\|string | 1 | 3.0.0 |
| value | 当前值 | number |  | 3.0.0 |
| onChange | 变化回调 | Function(value: number \| string) |  | 3.0.0 |

## 方法

| 名称    | 描述     | 版本  |
| ------- | -------- | ----- |
| blur()  | 移除焦点 | 3.0.0 |
| focus() | 获取焦点 | 3.0.0 |
