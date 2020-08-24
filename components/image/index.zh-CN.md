---
category: Components
subtitle: 图片
type: 数据展示
title: Image
cols: 2
cover: https://gw.alipayobjects.com/zos/bmw-prod/a77ae075-27de-49c9-9f44-a505f2be07fa.svg
---

可预览的图片。

## 何时使用

- 需要展示图片时使用。
- 加载大图时显示 loading 或加载失败时容错处理。

## API

| 参数        | 说明                               | 类型             | 默认值 | 版本  |
| ----------- | ---------------------------------- | ---------------- | ------ | ----- |
| alt         | 图像描述                           | string           | -      | 4.6.0 |
| fallback    | 加载失败容错地址                   | string           | -      | 4.6.0 |
| height      | 图像高度                           | string \| number | -      | 4.6.0 |
| placeholder | 加载占位, 为 `true` 时使用默认占位 | ReactNode        | -      | 4.6.0 |
| preview     | 是否开启预览                       | boolean          | true   | 4.6.0 |
| src         | 图片地址                           | string           | -      | 4.6.0 |
| width       | 图像宽度                           | string \| number | -      | 4.6.0 |

其他属性见 [<img\>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#Attributes)
