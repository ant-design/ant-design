---
category: Components
subtitle: 数字输入框
type: Data Entry
title: InputNumber
---

通过鼠标或键盘，输入范围内的数值。

## 何时使用

当需要获取标准数值时。

## API

属性如下

| 成员        | 说明           | 类型               | 默认值       |
|-------------|----------------|--------------------|--------------|
| min     | 最小值   | number | -Infinity        |
| max     | 最大值       | number      | Infinity           |
| value     | 当前值       | number      |            |
| step     | 每次改变步数，可以为小数  | number\|string      |  1      |
| defaultValue     | 初始值       | number      |            |
| onChange     | 变化回调       | Function(value: number \| string) |            |
| disabled     | 禁用       | boolean      |      false      |
| size    | 输入框大小  | string      |      无      |
| formatter | 指定输入框展示值的格式 | function(value: number \| string): string | - |
| parser | 指定从 formatter 里转换回数字的方式，和 formatter 搭配使用 | function( string): number | - |
