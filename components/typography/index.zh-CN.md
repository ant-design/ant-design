---
category: Components
subtitle: 排版
type: 通用
title: Typography
cols: 1
cover: https://gw.alipayobjects.com/zos/alicdn/GOM1KQ24O/Typography.svg
---

文本的基本格式。

## 何时使用

- 当需要展示标题、段落、列表内容时使用，如文章/博客/日志的文本样式。
- 当需要一列基于文本的基础操作时，如拷贝/省略/可编辑。

## API

### Typography.Text

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| code | 添加代码样式 | boolean | false |  |
| copyable | 是否可拷贝，为对象时可进行各种自定义 | boolean \| [copyable](#copyable) | false | [copyable](#copyable) |
| delete | 添加删除线样式 | boolean | false |  |
| disabled | 禁用文本 | boolean | false |  |
| editable | 是否可编辑，为对象时可对编辑进行控制 | boolean \| [editable](#editable) | false | [editable](#editable) |
| ellipsis | 自动溢出省略，为对象时可设置省略行数、是否可展开、添加后缀等 | boolean \| [ellipsis](#ellipsis) | false | [ellipsis](#ellipsis) |
| mark | 添加标记样式 | boolean | false |  |
| keyboard | 添加键盘样式 | boolean | false | 4.3.0 |
| underline | 添加下划线样式 | boolean | false |  |
| strong | 是否加粗 | boolean | false |  |
| type | 文本类型 | `secondary` \| `success` \| `warning` \| `danger` | - | success: 4.6.0 |

### Typography.Title

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| code | 添加代码样式 | boolean | false |  |
| copyable | 是否可拷贝，为对象时可进行各种自定义 | boolean \| [copyable](#copyable) | false | [copyable](#copyable) |
| delete | 添加删除线样式 | boolean | false |  |
| disabled | 禁用文本 | boolean | false |  |
| editable | 是否可编辑，为对象时可对编辑进行控制 | boolean \| [editable](#editable) | false | [editable](#editable) |
| ellipsis | 自动溢出省略，为对象时可设置省略行数、是否可展开、添加后缀等 | boolean \| [ellipsis](#ellipsis) | false | [ellipsis](#ellipsis) |
| level | 重要程度，相当于 `h1`、`h2`、`h3`、`h4`、`h5` | number: 1, 2, 3, 4, 5 | 1 | 5: 4.6.0 |
| mark | 添加标记样式 | boolean | false |  |
| underline | 添加下划线样式 | boolean | false |  |
| onChange | 当用户提交编辑内容时触发 | function(string) | - |  |
| type | 文本类型 | `secondary` \| `success` \| `warning` \| `danger` | - | success: 4.6.0 |

### Typography.Paragraph

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| code | 添加代码样式 | boolean | false |  |
| copyable | 是否可拷贝，为对象时可进行各种自定义 | boolean \| [copyable](#copyable) | false | [copyable](#copyable) |
| delete | 添加删除线样式 | boolean | false |  |
| disabled | 禁用文本 | boolean | false |  |
| editable | 是否可编辑，为对象时可对编辑进行控制 | boolean \| [editable](#editable) | false | [editable](#editable) |
| ellipsis | 自动溢出省略，为对象时可设置省略行数、是否可展开、添加后缀等 | boolean \| [ellipsis](#ellipsis) | false | [ellipsis](#ellipsis) |
| mark | 添加标记样式 | boolean | false |  |
| underline | 添加下划线样式 | boolean | false |  |
| onChange | 当用户提交编辑内容时触发 | function(string) | - |  |
| strong | 是否加粗 | boolean | false |  |
| type | 文本类型 | `secondary` \| `success` \| `warning` \| `danger` | - | success: 4.6.0 |

### copyable

```
{
  text: string,
  onCopy: function,
  icon: ReactNode,
  tooltips: false | [ReactNode, ReactNode],
}
```

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| text | 拷贝到剪切板里的文本 | string | - |  |
| onCopy | 拷贝成功的回调函数 | function | - |  |
| icon | 自定义拷贝图标：\[默认图标, 拷贝后的图标] | \[ReactNode, ReactNode\] | - | 4.6.0 |
| tooltips | 自定义提示文案，为 false 时隐藏文案 | \[ReactNode, ReactNode\] | \[`复制`, `复制成功`] | 4.4.0 |

### editable

```
{
  icon: ReactNode,
  tooltip: boolean | ReactNode,
  editing: boolean,
  maxLength: number,
  autoSize: boolean | { minRows: number, maxRows: number },
  onStart: function,
  onChange: function(string),
}
```

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| icon | 自定义编辑图标 | ReactNode | &lt;EditOutlined /> | 4.6.0 |
| tooltip | 自定义提示文本，为 false 时关闭 | boolean \| ReactNode | `编辑` | 4.6.0 |
| editing | 控制是否是编辑中状态 | boolean | false |  |
| maxLength | 编辑中文本域最大长度 | number | - | 4.4.0 |
| autoSize | 自动 resize 文本域 | boolean \| { minRows: number, maxRows: number } | - | 4.4.0 |
| onStart | 进入编辑中状态时触发 | function | - |  |
| onChange | 文本域编辑时触发 | function(event) | - |  |

### ellipsis

```
{
  rows: number,
  expandable: boolean,
  suffix: string,
  symbol: ReactNode,
  onExpand: function(event),
  onEllipsis: function(ellipsis),
}
```

| 参数       | 说明               | 类型               | 默认值 | 版本  |
| ---------- | ------------------ | ------------------ | ------ | ----- |
| rows       | 最多显示的行数     | number             | -      |       |
| expandable | 是否可展开         | boolean            | -      |       |
| suffix     | 自定义省略内容后缀 | ReactNode          | -      |       |
| symbol     | 自定义省略符号     | ReactNode          | `...`  |       |
| onExpand   | 点击展开时的回调   | function(event)    | -      |       |
| onEllipsis | 触发省略时的回调   | function(ellipsis) | -      | 4.2.0 |

## FAQ

### Typography.Link 如何与 react-router 库集成？

`react-router` 支持[自定义](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/Link.md#component-reactcomponent)渲染组件：

```tsx
<Link to="/" component={Typography.Link} />
```
