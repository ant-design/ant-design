---
category: Components
type: 布局
subtitle: 间距
title: Space
cover: https://gw.alipayobjects.com/zos/antfincdn/wc6%263gJ0Y8/Space.svg
---

设置组件之间的间距。

## 何时使用

避免组件紧贴在一起，拉开统一的空间。

- 适合行内元素的水平间距。
- 可以设置各种水平对齐方式。

## 代码演示

<code src="./demo/base.tsx">基本用法</code>
<code src="./demo/vertical.tsx">垂直间距</code>
<code src="./demo/size.tsx">间距大小</code>
<code src="./demo/align.tsx">对齐</code>
<code src="./demo/customize.tsx">自定义尺寸</code>
<code src="./demo/wrap.tsx">自动换行</code>
<code src="./demo/debug.tsx">多样的 Child</code>
<code src="./demo/gap-in-line.tsx">Flex gap 样式</code>
<code src="./demo/split.tsx">分隔符</code>

## API

| 参数      | 说明                                   | 类型                                     | 默认值       | 版本                  |
| --------- | -------------------------------------- | ---------------------------------------- | ------------ | --------------------- |
| align     | 对齐方式                               | `start` \| `end` \|`center` \|`baseline` | -            | 4.2.0                 |
| direction | 间距方向                               | `vertical` \| `horizontal`               | `horizontal` | 4.1.0                 |
| size      | 间距大小                               | [Size](#Size) \| [Size\[\]](#Size)       | `small`      | 4.1.0 \| Array: 4.9.0 |
| split     | 设置拆分                               | ReactNode                                | -            | 4.7.0                 |
| wrap      | 是否自动换行，仅在 `horizontal` 时有效 | boolean                                  | false        | 4.9.0                 |

### Size

`'small' | 'middle' | 'large' | number`
