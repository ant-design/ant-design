---
category: Components
type: General
title: Typography
cols: 1
---

Basic format and regular operation on text.

## When To Use

When need to display title or text content.

## API

### Typography.Text

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| copyable | Content can be copied. Default use `children`, will use `copyable` content when `copyable` is string | boolean \| string | false |
| delete | delete line style | boolean | false |
| disabled | Disable content | boolean | false |
| editable | Content can be edited  | boolean | false |
| extendable | Display extend button when in ellipsis | boolean | false |
| mark | mark style | boolean | false |
| rows | Set max rows and make ellipsis if over the rows. Style will change from `display: inline` to `display: inline-block` after set | number | - |
| underline | underline style | boolean | false |
| onChange | Trigger when user edit the content | Function(string) | - |
| strong | bold style | boolean | false |
| type | Content type | `secondary`, `warning`, `danger` | - |

### Typography.Title

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| bold | bold style | boolean | false |
| copyable | Content can be copied. Default use `children`, will use `copyable` content when `copyable` is string | 
| delete | delete line style | boolean | false |
| disabled | Disable content | boolean | false |
| editable | Content can be edited  | boolean | false |
| extendable | Display extend button when in ellipsis | boolean | false |
| level | Set content importance | number: `1`, `2`, `3`, `4` | 1 |
| mark | mark style | boolean | false |
| rows | Set max rows and make ellipsis if over the rows. Style will change from `display: inline` to `display: inline-block` after set | number | - |
| underline | underline style | boolean | false |
| onChange | Trigger when user edit the content | Function(string) | - |
| strong | bold style | boolean | false |
| type | Content type | `secondary`, `warning`, `danger` | - |

### Typography.Paragraph

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| bold | bold style | boolean | false |
| copyable | Content can be copied. Default use `children`, will use `copyable` content when `copyable` is string | 
| delete | delete line style | boolean | false |
| disabled | Disable content | boolean | false |
| editable | Content can be edited  | boolean | false |
| extendable | Display extend button when in ellipsis | boolean | false |
| mark | mark style | boolean | false |
| rows | Set max rows and make ellipsis if over the rows. Style will change from `display: inline` to `display: inline-block` after set | number | - |
| underline | underline style | boolean | false |
| onChange | Trigger when user edit the content | Function(string) | - |
| strong | bold style | boolean | false |
| type | Content type | `secondary`, `warning`, `danger` | - |
