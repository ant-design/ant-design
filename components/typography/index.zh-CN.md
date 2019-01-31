---
category: Components
subtitle: 排版
type: 通用
title: Typography
cols: 1
---

文本的基本格式及常见操作。

## 何时使用

当需要展示标题、文本内容时使用。例如博客、使用帮助、网站介绍等场景。

## API

### Typography.Text

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| copyable | 是否可拷贝，默认用 children，`copyable` 为 string 时优先用 `copyable` 的内容。 | boolean \| string | false |
| delete | 添加删除线样式 | boolean | false |
| disabled | 禁用文本 | boolean | false |
| editable | 是否可编辑 | boolean | false |
| ellipsis | 设置自动溢出省略 | boolean | false |
| mark | 添加标记样式 | boolean | false |
| underline | 添加下划线样式 | boolean | false |
| onChange | 当用户提交编辑内容时触发 | Function(string) | - |
| strong | 是否加粗 | boolean | false |
| type | 文本类型 | `secondary`, `warning`, `danger` | - |

### Typography.Title

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| copyable | 是否可拷贝，默认用 children，`copyable` 为 string 时优先用 `copyable` 的内容。 | boolean \| string | false |
| delete | 添加删除线样式 | boolean | false |
| disabled | 禁用文本 | boolean | false |
| editable | 是否可编辑 | boolean | false |
| ellipsis | 自动溢出省略，为对象时可设置省略行数与是否可展开 | boolean \| { rows: number, expandable: boolean } | false |
| level | 重要程度，相当于 `h1`、`h2`、`h3`、`h4` | number: `1`, `2`, `3`, `4` | 1 |
| mark | 添加标记样式 | boolean | false |
| underline | 添加下划线样式 | boolean | false |
| onChange | 当用户提交编辑内容时触发 | Function(string) | - |
| type | 文本类型 | `secondary`, `warning`, `danger` | - |

### Typography.Paragraph

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| copyable | 是否可拷贝，默认用 children，`copyable` 为 string 时优先用 `copyable` 的内容。 | boolean \| string | false |
| delete | 添加删除线样式 | boolean | false |
| disabled | 禁用文本 | boolean | false |
| editable | 是否可编辑 | boolean | false |
| ellipsis | 自动溢出省略，为对象时可设置省略行数与是否可展开 | boolean \| { rows: number, expandable: boolean } | false |
| mark | 添加标记样式 | boolean | false |
| underline | 添加下划线样式 | boolean | false |
| onChange | 当用户提交编辑内容时触发 | Function(string) | - |
| strong | 是否加粗 | boolean | false |
| type | 文本类型 | `secondary`, `warning`, `danger` | - |
