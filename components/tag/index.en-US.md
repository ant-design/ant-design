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

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| afterClose | Callback executed when close animation is completed, please use `onClose`, we will remove this in the next version | () => void | - |
| closable | Whether the Tag can be closed | boolean | `false` |
| color | Color of the Tag | string | - |
| onClose | Callback executed when tag is closed | (e) => void | - |
| visible | Whether the Tag is closed or not | boolean | `true` |

### Tag.CheckableTag

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| checked | Checked status of Tag | boolean | `false` |
| onChange | Callback executed when Tag is checked/unchecked | (checked) => void | - |
