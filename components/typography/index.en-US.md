---
category: Components
type: General
title: Typography
cols: 1
---

Basic format and regular operation on text.

## When To Use

When need to display title or text content. Like blog, help document, site about, etc.

## API

### Typography.Text

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| copyable | Content can be copied. Default use `children`, will use `copyable` content when `copyable` is string | boolean \| string | false |
| delete | delete line style | boolean | false |
| disabled | Disable content | boolean | false |
| editable | Content can be edited  | boolean | false |
| ellipsis | Display ellipsis when overflow | boolean | false |
| mark | mark style | boolean | false |
| underline | underline style | boolean | false |
| onChange | Trigger when user edit the content | Function(string) | - |
| strong | bold style | boolean | false |
| type | Content type | `secondary`, `warning`, `danger` | - |

### Typography.Title

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| copyable | Content can be copied. Default use `children`, will use `copyable` content when `copyable` is string | 
| delete | delete line style | boolean | false |
| disabled | Disable content | boolean | false |
| editable | Content can be edited  | boolean | false |
| ellipsis | Display ellipsis when overflow. Can config rows and expandable by using object | boolean \| { rows: number, expandable: boolean } | false |
| level | Set content importance. Match with `h1`, `h2`, `h3`, `h4` | number: `1`, `2`, `3`, `4` | 1 |
| mark | mark style | boolean | false |
| underline | underline style | boolean | false |
| onChange | Trigger when user edit the content | Function(string) | - |
| type | Content type | `secondary`, `warning`, `danger` | - |

### Typography.Paragraph

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| copyable | Content can be copied. Default use `children`, will use `copyable` content when `copyable` is string | 
| delete | delete line style | boolean | false |
| disabled | Disable content | boolean | false |
| editable | Content can be edited  | boolean | false |
| ellipsis | Display ellipsis when overflow. Can config rows and expandable by using object | boolean \| { rows: number, expandable: boolean } | false |
| mark | mark style | boolean | false |
| underline | underline style | boolean | false |
| onChange | Trigger when user edit the content | Function(string) | - |
| strong | bold style | boolean | false |
| type | Content type | `secondary`, `warning`, `danger` | - |
