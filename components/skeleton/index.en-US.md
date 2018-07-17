---
category: Components
type: Data Entry
title: Skeleton
cols: 1
---

Let user to have the anticipation for waiting
, which helps to make the loading process more smooth.
Provide the placeholder to prevent space shake when loading.

## When To Use

- When resource needs long time to load, like low network speed.
- The component contains much information. Such as List or Card.

## API

### Skeleton

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| loading | Display the skeleton when `true` | boolean | - |
| avatar | Show avatar placeholder | boolean \| [SkeletonAvatarProps](#SkeletonAvatarProps) | false |
| title | Show title placeholder | boolean \| [SkeletonTitleProps](#SkeletonTitleProps) | true |
| paragraph | Show paragraph placeholder | boolean \| [SkeletonParagraphProps](#SkeletonParagraphProps) | true |

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
