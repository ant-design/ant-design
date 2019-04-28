---
category: Components
type: Feedback
title: Skeleton
cols: 1
---

Provide a placeholder while you wait for content to load, or to visualise content that doesn't exist yet.
## When To Use

- When a resource needs long time to load.
- When the component contains lots of information, such as List or Card.
- Only works when loading data for the first time.
- Could be replaced by Spin in any situation, but can provide a better user experience.

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
