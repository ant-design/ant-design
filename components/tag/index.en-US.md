---
category: Components
type: Data Display
title: Tag
---

Tag for categorizing or markup.

## When To Use

- It can be used to tag by dimension or property.

- When categorizing.

## API

### Tag

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| afterClose | Callback executed when close animation is completed, please use `onClose`, we will remove this in the next version | () => void | - | 3.0.0 |
| closable | Whether the Tag can be closed | boolean | `false` | 3.0.0 |
| color | Color of the Tag | string | - | 3.0.0 |
| onClose | Callback executed when tag is closed | (e) => void | - | 3.0.0 |
| visible | Whether the Tag is closed or not | boolean | `true` | 3.7.0 |

### Tag.CheckableTag

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| checked | Checked status of Tag | boolean | `false` | 3.0.0 |
| onChange | Callback executed when Tag is checked/unchecked | (checked) => void | - | 3.0.0 |
