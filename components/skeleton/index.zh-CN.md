---
category: Components
subtitle: 加载占位图
type: Data Entry
title: Skeleton
cols: 1
---

缓解用户等待的焦虑，建立用户的心理预期，提升加载过程的流畅度。

## 何时使用

- 网络较慢，需要长时间等待加载处理的情况下
- 图文信息内容较多的列表/卡片中


## API

### Skeleton
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| loading | 为 `true` 时，显示占位图。反之则直接展示子组件 | boolean | - |
| avatar | 是否显示头像占位图 | boolean \| [SkeletonAvatarProps](#SkeletonAvatarProps) | false |
| title | 是否显示标题占位图，配置见下 | boolean \| [SkeletonTitleProps](#SkeletonTitleProps) | true |
| paragraph | 是否显示段落占位图，配置见下 | boolean \| [SkeletonParagraphProps](#SkeletonParagraphProps) | true |

### SkeletonAvatarProps
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 设置头像占位图的大小 | Enum{ 'large', 'small', 'default' } | - |
| shape | 指定头像的形状 | Enum{ 'circle', 'square' } | - |

### SkeletonTitleProps
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| width | 设置标题占位图的宽度 | number \| string | - |

### SkeletonParagraphProps
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| rows | 设置段落占位图的行数 | number | - |
| width | 设置标题占位图的宽度，若为数组时则为对应的每行宽度，反之则是最后一行的宽度 | number \| string \| Array<number \| string> | - |
