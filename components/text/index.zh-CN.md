---
category: Components
subtitle: 文本
type: 通用
title: Text
---

文本的基本格式及常见操作。

## 何时使用

当需要展示标题、文本内容时使用。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| copyable | 是否可拷贝 | boolean | false |
| editable | 是否可编辑 | boolean | false |
| lines | 设置超过行数则省略，设置后样式会从 `display: inline` 转成 `display: inline-block` | number | - |
| onChange | 当用户提交编辑内容时触发 | Function(string) | - |
| type | 文本类型 | `secondary`, `warning`, `danger` | - |
| disabled | 禁用文本 | boolean | false |

### Text.Title

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| copyable | 是否可拷贝 | boolean | false |
| editable | 是否可编辑 | boolean | false |
| level | 重要程度 | number: `1`, `2`, `3`, `4` | 1 |
| lines | 设置超过行数则省略 | number | - |
| onChange | 当用户提交编辑内容时触发 | Function(string) | - |
| type | 文本类型 | `secondary`, `warning`, `danger` | - |
| disabled | 禁用文本 | boolean | false |

### Text.Paragraph

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| copyable | 是否可拷贝 | boolean | false |
| editable | 是否可编辑 | boolean | false |
| lines | 设置超过行数则省略 | number | - |
| onChange | 当用户提交编辑内容时触发 | Function(string) | - |
| type | 文本类型 | `secondary`, `warning`, `danger` | - |
| disabled | 禁用文本 | boolean | false |
