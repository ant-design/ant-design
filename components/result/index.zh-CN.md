---
type: 反馈
category: Components
title: Result
cols: 1
subtitle: 结果
---

用于反馈一系列操作任务的处理结果。

## 何时使用

当有重要操作需告知用户处理结果，且反馈内容较为复杂时使用。

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| title | title 文字 | ReactNode | - | 3.20.0 |
| subTitle | subTitle 文字 | ReactNode | - | 3.20.0 |
| status | 结果的状态,决定图标和颜色 | `'success' | 'error' | 'info' | 'warning'| '404' | '403' | '500'` | 'info' | 3.20.0 |
| icon | 自定义 icon | string \| ReactNode | - | 3.20.0 |
| extra | 操作区 | ReactNode | - | 3.20.0 |
