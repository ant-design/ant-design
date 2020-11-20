---
category: Components
type: 布局
subtitle: 间距
title: Space
cols: 1
cover: https://gw.alipayobjects.com/zos/antfincdn/wc6%263gJ0Y8/Space.svg
---

设置组件之间的间距。

## 何时使用

避免组件紧贴在一起，拉开统一的空间。

- 适合行内元素的水平间距。
- 可以设置各种水平对齐方式。

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| align | 对齐方式 | `start` \| `end` \|`center` \|`baseline` | - | 4.2.0 |
| direction | 间距方向 | `vertical` \| `horizontal` | `horizontal` | 4.1.0 |
| size | 间距大小 | [Size](space#size) \| [Size](space#size)[]| `small` | 4.1.0 \| Array:4.9.0 |
| split | 设置拆分 | ReactNode | - | 4.7.0 |
| wrap | 	是否自动换行 | boolean | true | 4.9.0 |

### Size

`small | middle | large | number`
