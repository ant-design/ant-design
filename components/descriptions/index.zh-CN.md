---
category: Components
subtitle: 描述列表
type: 数据展示
title: Descriptions
cols: 1
cover: https://gw.alipayobjects.com/zos/alicdn/MjtG9_FOI/Descriptions.svg
---

成组展示多个只读字段。

## 何时使用

常见于详情页的信息展示。

## API

### Descriptions

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| title | 描述列表的标题，显示在最顶部 | ReactNode | - |  |
| extra | 描述列表的操作区域，显示在右上方 | ReactNode | - | 4.5.0 |
| bordered | 是否展示边框 | boolean | false |  |
| column | 一行的 `DescriptionItems` 数量，可以写成像素值或支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | number | 3 |  |
| size | 设置列表的大小。可以设置为 `middle` 、`small`, 或不填（只有设置 `bordered={true}` 生效） | `default` \| `middle` \| `small` | - |  |
| layout | 描述布局 | `horizontal` \| `vertical` | `horizontal` |  |
| colon | 配置 `Descriptions.Item` 的 `colon` 的默认值 | boolean | true |  |

### DescriptionItem

| 参数  | 说明         | 类型      | 默认值 | 版本 |
| ----- | ------------ | --------- | ------ | ---- |
| label | 内容的描述   | ReactNode | -      |      |
| span  | 包含列的数量 | number    | 1      |      |

> span 是 Description.Item 的数量。 span={2} 会占用两个 DescriptionItem 的宽度。
