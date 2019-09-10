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

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| active | Show animation effect | boolean | false | 3.9.0 |
| avatar | Show avatar placeholder | boolean \| [SkeletonAvatarProps](#SkeletonAvatarProps) | false | 3.9.0 |
| loading | Display the skeleton when `true` | boolean | - | 3.9.0 |
| paragraph | Show paragraph placeholder | boolean \| [SkeletonParagraphProps](#SkeletonParagraphProps) | true | 3.9.0 |
| title | Show title placeholder | boolean \| [SkeletonTitleProps](#SkeletonTitleProps) | true | 3.9.0 |

### SkeletonAvatarProps

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| size | Set the size of avatar | number \| Enum{ 'large', 'small', 'default' } | - | 3.9.0 |
| shape | Set the shape of avatar | Enum{ 'circle', 'square' } | - | 3.9.0 |

### SkeletonTitleProps

| Property | Description            | Type             | Default | Version |
| -------- | ---------------------- | ---------------- | ------- | ------- |
| width    | Set the width of title | number \| string | -       | 3.9.0   |

### SkeletonParagraphProps

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| rows | Set the row count of paragraph | number | - | 3.9.0 |
| width | Set the width of paragraph. When width is an Array, it can set the width of each row. Otherwise only set the last row width | number \| string \| Array<number \| string> | - | 3.9.0 |
