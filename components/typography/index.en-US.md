---
category: Components
type: General
title: Typography
cols: 1
---

Basic text writing, including headings, body text, lists, and more.

## When To Use

- When need to display a title or paragraph contents in Articles/Blogs/Notes.
- When you need copyable/editable/ellipsis texts.

## API

### Typography.Text

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| code | Code style | boolean | false |  |
| copyable | Config copy. Can set copy text and callback when is an object | boolean \| { text: string, onCopy: Function } | false |  |
| delete | Deleted line style | boolean | false |  |
| disabled | Disabled content | boolean | false |  |
| editable | Editable. Can control edit state when is object | boolean \| { editing: boolean, onStart: Function, onChange: Function(string) } | false |  |
| ellipsis | Display ellipsis when text overflows | boolean | false |  |
| mark | Marked style | boolean | false |  |
| underline | Underlined style | boolean | false |  |
| onChange | Trigger when user edits the content | Function(string) | - |  |
| strong | Bold style | boolean | false |  |
| type | Content type | `secondary` \| `warning` \| `danger` | - |  |

### Typography.Title

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| code | Code style | boolean | false |  |
| copyable | Config copy. Can set copy text and callback when is an object | boolean \| { text: string, onCopy: Function } | false |  |
| delete | Deleted line style | boolean | false |  |
| disabled | Disabled content | boolean | false |  |
| editable | Editable. Can control edit state when is object | boolean \| { editing: boolean, onStart: Function, onChange: Function(string) } | false |  |
| ellipsis | Display ellipsis when text overflows. Can configure rows and expandable by using object | boolean \| { rows: number, expandable: boolean, onExpand: Function } | false |  |
| level | Set content importance. Match with `h1`, `h2`, `h3`, `h4` | number: `1`, `2`, `3`, `4` | 1 |  |
| mark | Marked style | boolean | false |  |
| underline | Underlined style | boolean | false |  |
| onChange | Trigger when user edits the content | Function(string) | - |  |
| type | Content type | `secondary` \| `warning` \| `danger` | - |  |

### Typography.Paragraph

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| code | Code style | boolean | false |  |
| copyable | Config copy. Can set copy text and callback when is an object | boolean \| { text: string, onCopy: Function } | false |  |
| delete | Deleted line style | boolean | false |  |
| disabled | Disabled content | boolean | false |  |
| editable | Editable. Can control edit state when is object | boolean \| { editing: boolean, onStart: Function, onChange: Function(string) } | false |  |
| ellipsis | Display ellipsis when text overflows. Can configure rows expandable and suffix by using object | boolean \| { rows: number, expandable: boolean suffix: string, onExpand: Function } | false |  |
| mark | Marked style | boolean | false |  |
| underline | Underlined style | boolean | false |  |
| onChange | Trigger when user edits the content | Function(string) | - |  |
| strong | Bold style | boolean | false |  |
| type | Content type | `secondary` \| `warning` \| `danger` | - |  |
