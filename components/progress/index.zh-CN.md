---
category: Components
subtitle: 进度条
type: Feedback
title: Progress
---

展示操作的当前进度。

## 何时使用

在操作需要较长时间才能完成时，为用户显示该操作的当前进度和状态。

- 当一个操作会打断当前界面，或者需要在后台运行，且耗时可能超过2秒时；
- 当需要显示一个操作完成的百分比时。

## API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| format | 内容的模板函数 | function(percent) | `percent => percent + '%'` |
| gapDegree `(type=circle)` | 圆形进度条缺口角度，可取值 0 ~ 360 | number | 0 |
| gapPosition `(type=circle)` | 圆形进度条缺口位置 | Enum{ 'top', 'bottom', 'left', 'right' } | `top` |
| percent | 百分比 | number | 0 |
| showInfo | 是否显示进度数值或状态图标 | boolean | true |
| status | 状态，可选：`success` `exception` `active` | string | - |
| strokeWidth `(type=line)` | 进度条线的宽度，单位 px | number | 10 |
| strokeWidth `(type=circle)` | 圆形进度条线的宽度，单位是进度条画布宽度的百分比 | number | 6 |
| type | 类型，可选 `line` `circle` `dashboard` | string | line |
| width `(type=circle)` | 圆形进度条画布宽度，单位 px | number | 132 |
| successPercent | 已完成的分段百分比，`type="line"` 时有效 | number | 0 |
