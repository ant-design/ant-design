---
category: Components
subtitle: 排版
type: 通用
title: Typography
cols: 1
---

文本的基本格式。

## 何时使用

- 当需要展示标题、段落、列表内容时使用，如文章/博客/日志的文本样式。
- 当需要一列基于文本的基础操作时，如拷贝/省略/可编辑。

## API

### Typography.Text

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| copyable | 是否可拷贝，为对象时可设置复制文本以回调函数 | boolean \| { text: string, onCopy: Function } | false |  |
| delete | 添加删除线样式 | boolean | false |  |
| disabled | 禁用文本 | boolean | false |  |
| editable | 是否可编辑，为对象时可对编辑进行控制 | boolean \| { editing: boolean, onStart: Function, onChange: Function(string) } | false |  |
| ellipsis | 设置自动溢出省略 | boolean | false |  |
| mark | 添加标记样式 | boolean | false |  |
| code | 添加代码样式 | boolean | false |  |
| underline | 添加下划线样式 | boolean | false |  |
| strong | 是否加粗 | boolean | false |  |
| type | 文本类型 | `secondary` \| `warning` \| `danger` | - |  |

### Typography.Title

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| copyable | 是否可拷贝，为对象时可设置复制文本以回调函数 | boolean \| { text: string, onCopy: Function } | false |  |
| delete | 添加删除线样式 | boolean | false |  |
| disabled | 禁用文本 | boolean | false |  |
| editable | 是否可编辑，为对象时可对编辑进行控制 | boolean \| { editing: boolean, onStart: Function, onChange: Function(string) } | false |  |
| ellipsis | 自动溢出省略，为对象时可设置省略行数与是否可展开等 | boolean \| { rows: number, expandable: boolean, onExpand: Function } | false |  |
| level | 重要程度，相当于 `h1`、`h2`、`h3`、`h4` | number: `1`, `2`, `3`, `4` | 1 |  |
| mark | 添加标记样式 | boolean | false |  |
| underline | 添加下划线样式 | boolean | false |  |
| onChange | 当用户提交编辑内容时触发 | Function(string) | - |  |
| type | 文本类型 | `secondary` \| `warning` \| `danger` | - |  |

### Typography.Paragraph

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| copyable | 是否可拷贝，为对象时可设置复制文本以回调函数 | boolean \| { text: string, onCopy: Function } | false |  |
| delete | 添加删除线样式 | boolean | false |  |
| disabled | 禁用文本 | boolean | false |  |
| editable | 是否可编辑，为对象时可对编辑进行控制 | boolean \| { editing: boolean, onStart: Function, onChange: Function(string) } | false |  |
| ellipsis | 自动溢出省略，为对象时可设置省略行数、是否可展开、添加后缀等 | boolean \| { rows: number, expandable: boolean, suffix: string, onExpand: Function } | false |  |
| mark | 添加标记样式 | boolean | false |  |
| underline | 添加下划线样式 | boolean | false |  |
| onChange | 当用户提交编辑内容时触发 | Function(string) | - |  |
| strong | 是否加粗 | boolean | false |  |
| type | 文本类型 | `secondary` \| `warning` \| `danger` | - |  |
