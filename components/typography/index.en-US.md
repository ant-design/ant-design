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

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| code | code style | boolean | false | 3.15.1 |
| copyable | Config copy. Can set copy text and callback when is an object | boolean \| { text: string, onCopy: Function } | false | 3.14.0 |
| delete | delete line style | boolean | false | 3.14.0 |
| disabled | Disable content | boolean | false | 3.14.0 |
| editable | Editable. Can control edit state when is object | boolean \| { editing: boolean, onStart: Function, onChange: Function(string) } | false | 3.14.0 |
| ellipsis | Display ellipsis when overflow | boolean | false | 3.14.0 |
| mark | mark style | boolean | false | 3.14.0 |
| underline | underline style | boolean | false | 3.14.0 |
| onChange | Trigger when user edit the content | Function(string) | - | 3.14.0 |
| strong | bold style | boolean | false | 3.14.0 |
| type | Content type | `secondary`, `warning`, `danger` | - | 3.14.0 |

### Typography.Title

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| code | code style | boolean | false | 3.15.1 |
| copyable | Config copy. Can set copy text and callback when is an object | boolean \| { text: string, onCopy: Function } | false | 3.14.0 |
| delete | delete line style | boolean | false | 3.14.0 |
| disabled | Disable content | boolean | false | 3.14.0 |
| editable | Editable. Can control edit state when is object | boolean \| { editing: boolean, onStart: Function, onChange: Function(string) } | false | 3.14.0 |
| ellipsis | Display ellipsis when overflow. Can config rows and expandable by using object | boolean \| { rows: number, expandable: boolean, onExpand: Function } | false | 3.14.0 |
| level | Set content importance. Match with `h1`, `h2`, `h3`, `h4` | number: `1`, `2`, `3`, `4` | 1 | 3.14.0 |
| mark | mark style | boolean | false | 3.14.0 |
| underline | underline style | boolean | false | 3.14.0 |
| onChange | Trigger when user edit the content | Function(string) | - | 3.14.0 |
| type | Content type | `secondary`, `warning`, `danger` | - | 3.14.0 |

### Typography.Paragraph

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| code | code style | boolean | false | 3.15.1 |
| copyable | Config copy. Can set copy text and callback when is an object | boolean \| { text: string, onCopy: Function } | false | 3.14.0 |
| delete | delete line style | boolean | false | 3.14.0 |
| disabled | Disable content | boolean | false | 3.14.0 |
| editable | Editable. Can control edit state when is object | boolean \| { editing: boolean, onStart: Function, onChange: Function(string) } | false | 3.14.0 |
| ellipsis | Display ellipsis when overflow. Can config rows and expandable by using object | boolean \| { rows: number, expandable: boolean, onExpand: Function } | false | 3.14.0 |
| mark | mark style | boolean | false | 3.14.0 |
| underline | underline style | boolean | false | 3.14.0 |
| onChange | Trigger when user edit the content | Function(string) | - | 3.14.0 |
| strong | bold style | boolean | false | 3.14.0 |
| type | Content type | `secondary`, `warning`, `danger` | - | 3.14.0 |
