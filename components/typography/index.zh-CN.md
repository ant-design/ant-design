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
| copyable | 是否可拷贝，为对象时可设置复制文本以回调函数 | boolean \| { text: string, onCopy: Function } | false | 3.14.0 |
| delete | 添加删除线样式 | boolean | false | 3.14.0 |
| disabled | 禁用文本 | boolean | false | 3.14.0 |
| editable | 是否可编辑，为对象时可对编辑进行控制 | boolean \| { editing: boolean, onStart: Function, onChange: Function(string) } | false | 3.14.0 |
| ellipsis | 设置自动溢出省略 | boolean | false | 3.14.0 |
| mark | 添加标记样式 | boolean | false | 3.14.0 |
| underline | 添加下划线样式 | boolean | false | 3.14.0 |
| strong | 是否加粗 | boolean | false | 3.14.0 |
| type | 文本类型 | `secondary`, `warning`, `danger` | - | 3.14.0 |

### Typography.Title

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| copyable | 是否可拷贝，为对象时可设置复制文本以回调函数 | boolean \| { text: string, onCopy: Function } | false | 3.14.0 |
| delete | 添加删除线样式 | boolean | false | 3.14.0 |
| disabled | 禁用文本 | boolean | false | 3.14.0 |
| editable | 是否可编辑，为对象时可对编辑进行控制 | boolean \| { editing: boolean, onStart: Function, onChange: Function(string) } | false | 3.14.0 |
| ellipsis | 自动溢出省略，为对象时可设置省略行数与是否可展开等 | boolean \| { rows: number, expandable: boolean, onExpand: Function } | false | 3.14.0 |
| level | 重要程度，相当于 `h1`、`h2`、`h3`、`h4` | number: `1`, `2`, `3`, `4` | 1 | 3.14.0 |
| mark | 添加标记样式 | boolean | false | 3.14.0 |
| underline | 添加下划线样式 | boolean | false | 3.14.0 |
| onChange | 当用户提交编辑内容时触发 | Function(string) | - | 3.14.0 |
| type | 文本类型 | `secondary`, `warning`, `danger` | - | 3.14.0 |

### Typography.Paragraph

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| copyable | 是否可拷贝，为对象时可设置复制文本以回调函数 | boolean \| { text: string, onCopy: Function } | false | 3.14.1 |
| delete | 添加删除线样式 | boolean | false | 3.14.0 |
| disabled | 禁用文本 | boolean | false | 3.14.0 |
| editable | 是否可编辑，为对象时可对编辑进行控制 | boolean \| { editing: boolean, onStart: Function, onChange: Function(string) } | false | 3.14.0 |
| ellipsis | 自动溢出省略，为对象时可设置省略行数与是否可展开等 | boolean \| { rows: number, expandable: boolean, onExpand: Function } | false | 3.14.0 |
| mark | 添加标记样式 | boolean | false | 3.14.0 |
| underline | 添加下划线样式 | boolean | false | 3.14.0 |
| onChange | 当用户提交编辑内容时触发 | Function(string) | - | 3.14.0 |
| strong | 是否加粗 | boolean | false | 3.14.0 |
| type | 文本类型 | `secondary`, `warning`, `danger` | - | 3.14.0 |
