---
category: Components
type: 布局
title: Divider
subtitle: 分割线
cover: https://gw.alipayobjects.com/zos/alicdn/5swjECahe/Divider.svg
---

区隔内容的分割线。

## 何时使用

- 对不同章节的文本段落进行分割。
- 对行内文字/链接进行分割，例如表格的操作列。

## API

### Divider

| 参数        | 说明                       | 类型                          | 默认值       | 版本  |
| ----------- | -------------------------- | ----------------------------- | ------------ | ----- |
| className   | 分割线样式类               | string                        | -            |       |
| dashed      | 是否虚线                   | boolean                       | false        |       |
| orientation | 分割线标题的位置           | `left` \| `right` \| `center` | `center`     |       |
| plain       | 文字是否显示为普通正文样式 | boolean                       | false        | 4.2.0 |
| style       | 分割线样式对象             | CSSProperties                 | -            |       |
| type        | 水平还是垂直类型           | `horizontal` \| `vertical`    | `horizontal` |       |

### Divider.Group

| 参数   | 说明             | 类型                       | 默认值     | 版本  |
| ------ | ---------------- | -------------------------- | ---------- | ----- |
| dashed | 是否虚线         | boolean                    | false      | 4.7.0 |
| type   | 水平还是垂直类型 | `horizontal` \| `vertical` | `vertical` | 4.7.0 |
