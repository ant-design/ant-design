---
category: Components
subtitle: 描述列表
type: 数据展示
title: Descriptions
cols: 1
---

成组展示多个只读字段。

## 何时使用

常见于详情页的信息展示。

## API

### Descriptions

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| title | 描述列表的标题，显示在最顶部 | ReactNode | - | 3.19.0 |
| bordered | 是否展示边框 | boolean | false | 3.19.0 |
| column | 一行的 `DescriptionItems` 数量，可以写成像素值或支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | number | 3 | 3.19.0 |
| size | 设置列表的大小。可以设置为 `middle` 、`small`, 或不填（只有设置 `bordered={true}` 生效） | `default | middle | small` | false | 3.19.0 |
| layout | 描述布局 | `horizontal | vertical` | `horizontal` | 3.19.8 |
| colon | 配置 `Descriptions.Item` 的 `colon` 的默认值 | boolean | true | 3.21.0 |

### DescriptionItem

| 参数  | 说明         | 类型      | 默认值 | 版本   |
| ----- | ------------ | --------- | ------ | ------ |
| label | 内容的描述   | ReactNode | -      | 3.19.0 |
| span  | 包含列的数量 | number    | 1      | 3.19.0 |

> span Description.Item 的数量。 span={2} 会占用两个 DescriptionItem 的宽度。
