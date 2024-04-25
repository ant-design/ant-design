---
category: Components
group: 通用
title: Typography
subtitle: 排版
description: 文本的基本格式。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*MLt3R6m9huoAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*LT2jR41Uj2EAAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用

- 当需要展示标题、段落、列表内容时使用，如文章/博客/日志的文本样式。
- 当需要一列基于文本的基础操作时，如拷贝/省略/可编辑。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本</code>
<code src="./demo/title.tsx">标题组件</code>
<code src="./demo/paragraph-debug.tsx" debug>标题与段落</code>
<code src="./demo/text.tsx">文本与超链接组件</code>
<code src="./demo/editable.tsx">可编辑</code>
<code src="./demo/copyable.tsx">可复制</code>
<code src="./demo/ellipsis.tsx">省略号</code>
<code src="./demo/ellipsis-controlled.tsx" version="5.16.0">受控省略展开/收起</code>
<code src="./demo/ellipsis-middle.tsx">省略中间</code>
<code src="./demo/ellipsis-debug.tsx" debug>省略号 Debug</code>
<code src="./demo/suffix.tsx">后缀</code>
<code src="./demo/componentToken-debug.tsx" debug>组件 Token</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

### Typography.Text

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| code | 添加代码样式 | boolean | false |  |
| copyable | 是否可拷贝，为对象时可进行各种自定义 | boolean \| [copyable](#copyable) | false | [copyable](#copyable) |
| delete | 添加删除线样式 | boolean | false |  |
| disabled | 禁用文本 | boolean | false |  |
| editable | 是否可编辑，为对象时可对编辑进行控制 | boolean \| [editable](#editable) | false | [editable](#editable) |
| ellipsis | 自动溢出省略，为对象时不能设置省略行数、是否可展开、onExpand 展开事件。不同于 Typography.Paragraph，Text 组件自身不带 100% 宽度样式，因而默认情况下初次缩略后宽度便不再变化。如果需要自适应宽度，请手工配置宽度样式 | boolean \| [Omit<ellipsis, 'expandable' \| 'rows' \| 'onExpand'>](#ellipsis) | false | [ellipsis](#ellipsis) |
| keyboard | 添加键盘样式 | boolean | false | 4.3.0 |
| mark | 添加标记样式 | boolean | false |  |
| onClick | 点击 Text 时的回调 | (event) => void | - |  |
| strong | 是否加粗 | boolean | false |  |
| italic | 是否斜体 | boolean | false | 4.16.0 |
| type | 文本类型 | `secondary` \| `success` \| `warning` \| `danger` | - | success: 4.6.0 |
| underline | 添加下划线样式 | boolean | false |  |

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
| onClick | 点击 Title 时的回调 | (event) => void | - |  |
| italic | 是否斜体 | boolean | false | 4.16.0 |
| type | 文本类型 | `secondary` \| `success` \| `warning` \| `danger` | - | success: 4.6.0 |
| underline | 添加下划线样式 | boolean | false |  |

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
| onClick | 点击 Paragraph 时的回调 | (event) => void | - |  |
| strong | 是否加粗 | boolean | false |  |
| italic | 是否斜体 | boolean | false | 4.16.0 |
| type | 文本类型 | `secondary` \| `success` \| `warning` \| `danger` | - | success: 4.6.0 |
| underline | 添加下划线样式 | boolean | false |  |

### copyable

    {
      text: string | (() => string | Promise<string>),
      onCopy: function(event),
      icon: ReactNode,
      tooltips: false | [ReactNode, ReactNode],
      format: 'text/plain' | 'text/html',
      tabIndex: number,
    }

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| format | 剪切板数据的 Mime Type | 'text/plain' \| 'text/html' | - | 4.21.0 |
| icon | 自定义拷贝图标：\[默认图标, 拷贝后的图标] | \[ReactNode, ReactNode] | - | 4.6.0 |
| text | 拷贝到剪切板里的文本 | string | - |  |
| tooltips | 自定义提示文案，为 false 时隐藏文案 | \[ReactNode, ReactNode] | \[`复制`, `复制成功`] | 4.4.0 |
| onCopy | 拷贝成功的回调函数 | function | - |  |
| tabIndex | 自定义复制按钮的 tabIndex | number | 0 | 5.17.0 |

### editable

    {
      icon: ReactNode,
      tooltip: boolean | ReactNode,
      editing: boolean,
      maxLength: number,
      autoSize: boolean | { minRows: number, maxRows: number },
      text: string,
      onChange: function(string),
      onCancel: function,
      onStart: function,
      onEnd: function,
      triggerType: ('icon' | 'text')[],
      enterIcon: ReactNode,
      tabIndex: number,
    }

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autoSize | 自动 resize 文本域 | boolean \| { minRows: number, maxRows: number } | - | 4.4.0 |
| editing | 控制是否是编辑中状态 | boolean | false |  |
| icon | 自定义编辑图标 | ReactNode | &lt;EditOutlined /> | 4.6.0 |
| maxLength | 编辑中文本域最大长度 | number | - | 4.4.0 |
| tooltip | 自定义提示文本，为 false 时关闭 | ReactNode | `编辑` | 4.6.0 |
| text | 显式地指定编辑文案，为空时将隐式地使用 children | string | - | 4.24.0 |
| onChange | 文本域编辑时触发 | function(value: string) | - |  |
| onCancel | 按 ESC 退出编辑状态时触发 | function | - |  |
| onStart | 进入编辑中状态时触发 | function | - |  |
| onEnd | 按 ENTER 结束编辑状态时触发 | function | - | 4.14.0 |
| triggerType | 编辑模式触发器类型，图标、文本或者两者都设置（不设置图标作为触发器时它会隐藏） | Array&lt;`icon`\|`text`> | \[`icon`] |  |
| enterIcon | 在编辑段中自定义“enter”图标（传递“null”将删除图标） | ReactNode | `<EnterOutlined />` | 4.17.0 |
| tabIndex | 自定义编辑按钮的 tabIndex | number | 0 | 5.17.0 |

### ellipsis

```tsx
interface EllipsisConfig {
  rows: number;
  /** `5.16.0` 新增 `collapsible` */
  expandable: boolean | 'collapsible';
  suffix: string;
  /** `5.16.0` 新增渲染函数 */
  symbol: ReactNode | ((expanded: boolean) => ReactNode);
  tooltip: boolean | ReactNode | TooltipProps;
  /** `5.16.0` 新增 */
  defaultExpanded: boolean;
  /** `5.16.0` 新增 */
  expanded: boolean;
  /** `5.16.0` 新增 `info` */
  onExpand: (event: MouseEvent, info: { expanded: boolean }) => void;
  onEllipsis: (ellipsis: boolean) => void;
}
```

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| expandable | 是否可展开 | boolean \| 'collapsible' | - | `collapsible`: 5.16.0 |
| rows | 最多显示的行数 | number | - |  |
| suffix | 自定义省略内容后缀 | string | - |  |
| symbol | 自定义展开描述文案 | ReactNode \| ((expanded: boolean) => ReactNode) | `展开` `收起` |  |
| tooltip | 省略时，展示提示信息 | ReactNode \| [TooltipProps](/components/tooltip-cn/#api) | - | 4.11.0 |
| defaultExpanded | 默认展开或收起 | boolean |  | 5.16.0 |
| expanded | 展开或收起 | boolean |  | 5.16.0 |
| onEllipsis | 触发省略时的回调 | function(ellipsis) | - | 4.2.0 |
| onExpand | 点击展开或收起时的回调 | function(event, { expanded: boolean }) | - | `info`: 5.16.0 |

## 主题变量（Design Token）

<ComponentTokenTable component="Typography"></ComponentTokenTable>

## FAQ

### Typography.Link 如何与 react-router 库集成？

`react-router` 支持[自定义](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/Link.md#component-reactcomponent)渲染组件：

```tsx
<Link to="/" component={Typography.Link} />
```

**注意：** 这并不是和 react-router 的 Link 的执行逻辑等价 [参考](https://github.com/ant-design/ant-design/pull/26737/files#r488769888)
