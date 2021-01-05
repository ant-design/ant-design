---
category: Components
type: Feedback
title: Skeleton
cols: 1
cover: https://gw.alipayobjects.com/zos/alicdn/KpcciCJgv/Skeleton.svg
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
| loading | Display the skeleton when true | boolean | - |
| paragraph | Show paragraph placeholder | boolean \| [SkeletonParagraphProps](#SkeletonParagraphProps) | true |
| round | Show paragraph and title radius when true | boolean | false |
| title | Show title placeholder | boolean \| [SkeletonTitleProps](#SkeletonTitleProps) | true |

### SkeletonAvatarProps

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| active | Show animation effect, only valid when used avatar independently | boolean | false |
| shape | Set the shape of avatar | `circle` \| `square` | - |
| size | Set the size of avatar | number \| `large` \| `small` \| `default` | - |

### SkeletonTitleProps

| Property | Description            | Type             | Default |
| -------- | ---------------------- | ---------------- | ------- |
| width    | Set the width of title | number \| string | -       |

### SkeletonParagraphProps

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| rows | Set the row count of paragraph | number | - |
| width | Set the width of paragraph. When width is an Array, it can set the width of each row. Otherwise only set the last row width | number \| string \| Array&lt;number \| string> | - |

### SkeletonButtonProps

| Property | Description             | Type                             | Default |
| -------- | ----------------------- | -------------------------------- | ------- |
| active   | Show animation effect   | boolean                          | false   |
| shape    | Set the shape of button | `circle` \| `round` \| `default` | -       |
| size     | Set the size of button  | `large` \| `small` \| `default`  | -       |

### SkeletonInputProps

| Property | Description           | Type                            | Default |
| -------- | --------------------- | ------------------------------- | ------- |
| active   | Show animation effect | boolean                         | false   |
| size     | Set the size of input | `large` \| `small` \| `default` | -       |
