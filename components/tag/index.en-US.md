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

| Property     | Description           | Type     | Default      |
|--------------|-----------------------|----------|--------------|
| color        | Color of the Tag      | string | - |
| closable     | Whether Tag can be closed    | boolean  | `false`        |
| onClose      | Callback executed when tag is closed | (e) => void | - |
| afterClose   | Callback executed when close animation is completed | () => void | - |

### Tag.CheckableTag

| Property     | Description           | Type     | Default      |
|--------------|-----------------------|----------|--------------|
| checked      | Checked status of Tag | boolean | `false` |
| onChange     | Callback executed when Tag is checked/unchecked | (checked) => void | - |
