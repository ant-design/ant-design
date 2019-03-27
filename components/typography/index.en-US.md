---
category: Components
type: General
title: Typography
cols: 1
---

Basic text writing, including headings, body text, lists, and more.

## When To Use

- When need to display title or paragraph contents in Articles/Blogs/Notes.
- When you need copyable/editable/ellipsis texts.

## API

### Typography.Text

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| code | code style | boolean | false |
| copyable | Config copy. Can set copy text and callback when is an object | boolean \| { text: string, onCopy: Function } | false |
| delete | delete line style | boolean | false |
| disabled | Disable content | boolean | false |
| editable | Editable. Can control edit state when is object | boolean \| { editing: boolean, onStart: Function, onChange: Function(string) } | false |
| ellipsis | Display ellipsis when overflow | boolean | false |
| mark | mark style | boolean | false |
| underline | underline style | boolean | false |
| onChange | Trigger when user edit the content | Function(string) | - |
| strong | bold style | boolean | false |
| type | Content type | `secondary`, `warning`, `danger` | - |

### Typography.Title

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| code | code style | boolean | false |
| copyable | Config copy. Can set copy text and callback when is an object | boolean \| { text: string, onCopy: Function } | false |
| delete | delete line style | boolean | false |
| disabled | Disable content | boolean | false |
| editable | Editable. Can control edit state when is object | boolean \| { editing: boolean, onStart: Function, onChange: Function(string) } | false |
| ellipsis | Display ellipsis when overflow. Can config rows and expandable by using object | boolean \| { rows: number, expandable: boolean, onExpand: Function } | false |
| level | Set content importance. Match with `h1`, `h2`, `h3`, `h4` | number: `1`, `2`, `3`, `4` | 1 |
| mark | mark style | boolean | false |
| underline | underline style | boolean | false |
| onChange | Trigger when user edit the content | Function(string) | - |
| type | Content type | `secondary`, `warning`, `danger` | - |

### Typography.Paragraph

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| code | code style | boolean | false |
| copyable | Config copy. Can set copy text and callback when is an object | boolean \| { text: string, onCopy: Function } | false |
| delete | delete line style | boolean | false |
| disabled | Disable content | boolean | false |
| editable | Editable. Can control edit state when is object | boolean \| { editing: boolean, onStart: Function, onChange: Function(string) } | false |
| ellipsis | Display ellipsis when overflow. Can config rows and expandable by using object | boolean \| { rows: number, expandable: boolean, onExpand: Function } | false |
| mark | mark style | boolean | false |
| underline | underline style | boolean | false |
| onChange | Trigger when user edit the content | Function(string) | - |
| strong | bold style | boolean | false |
| type | Content type | `secondary`, `warning`, `danger` | - |
