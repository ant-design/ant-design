---
category: Components
type: General
title: Text
---

Basic format and regular operation on text.

## When To Use

When need to display title or text content.

## API

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| copyable | Content can be copied | boolean | false |
| editable | Content can be edited  | boolean | false |
| rows | Set max rows and make ellipsis if over the rows. Style will change from `display: inline` to `display: inline-block` after set | number | - |
| onChange | Trigger when user edit the content | Function(string) | - |
| type | Content type | `secondary`, `warning`, `danger` | - |
| disabled | Disable content | boolean | false |

### Text.Title

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| copyable | Content can be copied | boolean | false |
| editable | Content can be edited  | boolean | false |
| level | Set content importance | number: `1`, `2`, `3`, `4` | 1 |
| rows | Set max rows and make ellipsis if over the rows. Style will change from `display: inline` to `display: inline-block` after set | number | - |
| onChange | Trigger when user edit the content | Function(string) | - |
| type | Content type | `secondary`, `warning`, `danger` | - |
| disabled | Disable content | boolean | false |

### Text.Paragraph

| 参数 | 说明 | 类型 | 默认值 |
| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| copyable | Content can be copied | boolean | false |
| editable | Content can be edited  | boolean | false |
| rows | Set max rows and make ellipsis if over the rows. Style will change from `display: inline` to `display: inline-block` after set | number | - |
| onChange | Trigger when user edit the content | Function(string) | - |
| type | Content type | `secondary`, `warning`, `danger` | - |
| disabled | Disable content | boolean | false |
