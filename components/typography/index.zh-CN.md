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
| copyable | 是否可拷贝，为对象时可进行各种自定义 | boolean \| { text: string, onCopy: function, icon: ReactNode, tooltips: boolean \| ReactNode } | false | icon and tooltips: 4.4.0 |
| delete | 添加删除线样式 | boolean | false |  |
| disabled | 禁用文本 | boolean | false |  |
| editable | 是否可编辑，为对象时可对编辑进行控制 | boolean \| { editing: boolean, maxLength: number, autoSize: true \| false \| { minRows: number, maxRows: number }, onStart: function, onChange: function(string), icon: ReactNode, tooltip: boolean \| ReactNode } | false | maxLength, autoSize, icon and tooltip: 4.6.0 |
| ellipsis | 设置自动溢出省略，需要设置元素宽度 | boolean | false |  |
| mark | 添加标记样式 | boolean | false |  |
| keyboard | 添加键盘样式 | boolean | false | 4.3.0 |
| underline | 添加下划线样式 | boolean | false |  |
| strong | 是否加粗 | boolean | false |  |
| type | 文本类型 | `secondary` \| `warning` \| `danger` | - |  |

### Typography.Title

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| code | 添加代码样式 | boolean | false |  |
| copyable | 是否可拷贝，为对象时可进行各种自定义 | boolean \| { text: string, onCopy: function, icon: ReactNode, tooltips: boolean \| ReactNode } | false | icon and tooltips: 4.4.0 |
| delete | 添加删除线样式 | boolean | false |  |
| disabled | 禁用文本 | boolean | false |  |
| editable | 是否可编辑，为对象时可对编辑进行控制 | boolean \| { editing: boolean, maxLength: number, autoSize: true \| false \| { minRows: number, maxRows: number }, onStart: function, onChange: function(string), icon: ReactNode, tooltip: boolean \| ReactNode } | false | maxLength, autoSize, icon and tooltip: 4.6.0 |
| ellipsis | 自动溢出省略，为对象时可设置省略行数与是否可展开等 | boolean \| { rows: number, expandable: boolean, onExpand: function(event), onEllipsis: function(ellipsis) } | false | onEllipsis: 4.2.0 |
| level | 重要程度，相当于 `h1`、`h2`、`h3`、`h4`、`h5` | number: 1, 2, 3, 4, 5 | 1 | 5: 4.6.0 |
| mark | 添加标记样式 | boolean | false |  |
| underline | 添加下划线样式 | boolean | false |  |
| onChange | 当用户提交编辑内容时触发 | function(string) | - |  |
| type | 文本类型 | `secondary` \| `warning` \| `danger` | - |  |

### Typography.Paragraph

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| code | 添加代码样式 | boolean | false |  |
| copyable | 是否可拷贝，为对象时可进行各种自定义 | boolean \| { text: string, onCopy: function, icon: ReactNode, tooltips: boolean \| ReactNode } | false | icon and tooltips: 4.4.0 |
| delete | 添加删除线样式 | boolean | false |  |
| disabled | 禁用文本 | boolean | false |  |
| editable | 是否可编辑，为对象时可对编辑进行控制 | boolean \| { editing: boolean, maxLength: number, autoSize: true \| false \| { minRows: number, maxRows: number }, onStart: function, onChange: function(string), icon: ReactNode, tooltip: boolean \| ReactNode } | false | maxLength, autoSize, icon and tooltip: 4.6.0 |
| ellipsis | 自动溢出省略，为对象时可设置省略行数、是否可展开、添加后缀等 | boolean \| { rows: number, expandable: boolean, suffix: string, symbol: React.ReactNode, onExpand: function(event), onEllipsis: function(ellipsis) } | false | onEllipsis: 4.2.0 |
| mark | 添加标记样式 | boolean | false |  |
| underline | 添加下划线样式 | boolean | false |  |
| onChange | 当用户提交编辑内容时触发 | function(string) | - |  |
| strong | 是否加粗 | boolean | false |  |
| type | 文本类型 | `secondary` \| `warning` \| `danger` | - |  |

## FAQ

### Typography.Link 如何与 react-router 库集成？

`react-router` 支持[自定义](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/Link.md#component-reactcomponent)渲染组件：

```tsx
<Link to="/" component={Typography.Link} />
```
