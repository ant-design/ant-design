---
category: Components
subtitle: 空状态
type: 数据展示
title: Empty
---

空状态时的展示占位图。

## 何时使用

当目前没有数据时，用于显式的用户提示。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| count | 展示的数字，大于 overflowCount 时显示为 `${overflowCount}+`，为 0 时隐藏 | ReactNode |  |
| dot | 不展示数字，只有一个小红点 | boolean | false |
| offset | 设置状态点的位置偏移，格式为 `[x, y]` | `[number, number]` | - |
| overflowCount | 展示封顶的数字值 | number | 99 |
| showZero | 当数值为 0 时，是否展示 Badge | boolean | false |
| status | 设置 Badge 为状态点 | Enum{ 'success', 'processing, 'default', 'error', 'warning' } | '' |
| text | 在设置了 `status` 的前提下有效，设置状态点的文本 | string | '' |
| title | 设置鼠标放在状态点上时显示的文字 | string | `count` |
