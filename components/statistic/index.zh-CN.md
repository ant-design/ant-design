---
category: Components
subtitle: 统计数值
type: 数据展示
title: Statistic
---

展示统计数值。

## 何时使用

- 当需要突出某个或某组数字时。
- 当需要展示带描述的统计类数据时使用。

## API

#### Statistic

| 参数             | 说明             | 类型                 | 默认值 | 版本   |
| ---------------- | ---------------- | -------------------- | ------ | ------ |
| decimalSeparator | 设置小数点       | string               | .      | 3.13.0 |
| formatter        | 自定义数值展示   | (value) => ReactNode | -      | 3.13.0 |
| groupSeparator   | 设置千分位标识符 | string               | ,      | 3.13.0 |
| precision        | 数值精度         | number               | -      | 3.13.0 |
| prefix           | 设置数值的前缀   | string \| ReactNode  | -      | 3.13.0 |
| suffix           | 设置数值的后缀   | string \| ReactNode  | -      | 3.13.0 |
| title            | 数值的标题       | string \| ReactNode  | -      | 3.13.0 |
| value            | 数值内容         | string \| number     | -      | 3.13.0 |
| valueStyle       | 设置数值的样式   | style                | -      | 3.13.0 |

#### Statistic.Countdown

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| format | 格式化倒计时展示，参考 [moment](http://momentjs.com/) | string | 'HH:mm:ss' | 3.13.0 |
| onFinish | 倒计时完成时触发 | () => void | - | 3.14.0 |
| prefix | 设置数值的前缀 | string \| ReactNode | - | 3.13.0 |
| suffix | 设置数值的后缀 | string \| ReactNode | - | 3.13.0 |
| title | 数值的标题 | string \| ReactNode | - | 3.13.0 |
| value | 数值内容 | number \| moment | - | 3.13.0 |
| valueStyle | 设置数值的样式 | style | - | 3.13.0 |
