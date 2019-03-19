---
category: Components
type: Feedback
title: Skeleton
cols: 1
---

Provide a placeholder at the place which need waiting for loading.
## When To Use

- When resource needs long time to load, like low network speed.
- The component contains much information. Such as List or Card.
- Only works when loading data at first time.
- Could be replaced by Spin in all situation, but provide better user experience than spin if it works.

## API

### Skeleton

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| active | Show animation effect | boolean | false |
| avatar | Show avatar placeholder | boolean \| [SkeletonAvatarProps](#SkeletonAvatarProps) | false |
| loading | Display the skeleton when `true` | boolean | - |
| paragraph | Show paragraph placeholder | boolean \| [SkeletonParagraphProps](#SkeletonParagraphProps) | true |
| title | Show title placeholder | boolean \| [SkeletonTitleProps](#SkeletonTitleProps) | true |

### SkeletonAvatarProps

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| size | Set the size of avatar | Enum{ 'large', 'small', 'default' } | - |
| shape | Set the shape of avatar | Enum{ 'circle', 'square' } | - |

### SkeletonTitleProps

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| width | Set the width of title | number \| string | - |

### SkeletonParagraphProps

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| rows | Set the row count of paragraph | number | - |
| width | Set the width of paragraph. When width is an Array, it can set the width of each row. Otherwise only set the last row width | number \| string \| Array<number \| string> | - |
