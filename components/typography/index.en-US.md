---
category: Components
type: General
title: Typography
cols: 1
cover: https://gw.alipayobjects.com/zos/alicdn/GOM1KQ24O/Typography.svg
---

Basic text writing, including headings, body text, lists, and more.

## When To Use

- When need to display a title or paragraph contents in Articles/Blogs/Notes.
- When you need copyable/editable/ellipsis texts.

## API

### Typography.Text

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| code | Code style | boolean | false |  |
| copyable | Whether to be copyable, customize it via setting an object | boolean \| [copyable](#copyable) | false | [copyable](#copyable) |
| delete | Deleted line style | boolean | false |  |
| disabled | Disabled content | boolean | false |  |
| editable | If editable. Can control edit state when is object | boolean \| [editable](#editable) } | false | [editable](#editable) |
| ellipsis | Display ellipsis when text overflows, can configure rows and expandable by using object | boolean \| [ellipsis](#ellipsis) | false | [ellipsis](#ellipsis) |
| mark | Marked style | boolean | false |  |
| keyboard | Keyboard style | boolean | false | 4.3.0 |
| underline | Underlined style | boolean | false |  |
| onChange | Trigger when user edits the content | function(string) | - |  |
| strong | Bold style | boolean | false |  |
| type | Content type | `secondary` \| `warning` \| `danger` | - |  |

### Typography.Title

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| code | Code style | boolean | false |  |
| copyable | Whether to be copyable, customize it via setting an object | boolean \| [copyable](#copyable) | false | [copyable](#copyable) |
| delete | Deleted line style | boolean | false |  |
| disabled | Disabled content | boolean | false |  |
| editable | If editable. Can control edit state when is object | boolean \| [editable](#editable) } | false | [editable](#editable) |
| ellipsis | Display ellipsis when text overflows, can configure rows and expandable by using object | boolean \| [ellipsis](#ellipsis) | false | [ellipsis](#ellipsis) |
| level | Set content importance. Match with `h1`, `h2`, `h3`, `h4`, `h5` | number: 1, 2, 3, 4, 5 | 1 | 5: 4.6.0 |
| mark | Marked style | boolean | false |  |
| underline | Underlined style | boolean | false |  |
| onChange | Trigger when user edits the content | function(string) | - |  |
| type | Content type | `secondary` \| `warning` \| `danger` | - |  |

### Typography.Paragraph

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| code | Code style | boolean | false |  |
| copyable | Whether to be copyable, customize it via setting an object | boolean \| [copyable](#copyable) | false | [copyable](#copyable) |
| delete | Deleted line style | boolean | false |  |
| disabled | Disabled content | boolean | false |  |
| editable | If editable. Can control edit state when is object | boolean \| [editable](#editable) } | false | [editable](#editable) |
| ellipsis | Display ellipsis when text overflows, can configure rows and expandable by using object | boolean \| [ellipsis](#ellipsis) | false | [ellipsis](#ellipsis) |
| mark | Marked style | boolean | false |  |
| underline | Underlined style | boolean | false |  |
| onChange | Trigger when user edits the content | function(string) | - |  |
| strong | Bold style | boolean | false |  |
| type | Content type | `secondary` \| `warning` \| `danger` | - |  |

### copyable

```
{
  text: string,
  onCopy: function,
  icon: React.ReactNode,
  tooltips: false | [React.ReactNode, React.ReactNode],
}
```

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| text | The text to copy | string | - |  |
| onCopy | Called when copied text | function | - |  |
| icon | Custom copy icon: `[copyIcon, copiedIcon]` | \[ReactNode, ReactNode\] | - | 4.6.0 |
| tooltips | Custom tooltip text, hide when it is false | \[ReactNode, ReactNode\] | `['Copy', 'Copied']` | 4.4.0 |

### editable

```
{
  icon: React.ReactNode,
  tooltip: boolean | React.ReactNode,
  editing: boolean,
  maxLength: number,
  autoSize: boolean | { minRows: number, maxRows: number },
  onStart: function,
  onChange: function(string),
}
```

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| icon | Custom editable icon | ReactNode | &lt;EditOutlined /> | 4.6.0 |
| tooltip | Custom tooltip text, hide when it is `false` | boolean \| React.ReactNode | `Edit` | 4.6.0 |
| editing | Whether to be editable | boolean | false |  |
| maxLength | `maxLength` attribute of textarea | number | - | 4.4.0 |
| autoSize | `autoSize` attribute of textarea | boolean \| { minRows: number, maxRows: number } | - | 4.4.0 |
| onStart | Called when enter editable state | function | - |  |
| onChange | Called when input at textarea | function(event) | - |  |

### ellipsis

```
{
  rows: number,
  expandable: boolean,
  suffix: string,
  symbol: React.ReactNode,
  onExpand: function(event),
  onEllipsis: function(ellipsis),
}
```

| Property   | Description                               | Type               | Default | Version |
| ---------- | ----------------------------------------- | ------------------ | ------- | ------- |
| rows       | Max rows of content                       | number             | -       |         |
| expandable | Whether to be expandable                  | boolean            | -       |         |
| suffix     | Suffix of ellipsis content                | ReactNode          | -       |         |
| symbol     | Custom `...` symbol of ellipsis           | ReactNode          | `...`   |         |
| onExpand   | Called when expand content                | function(event)    | -       |         |
| onEllipsis | Called when enter or leave ellipsis state | function(ellipsis) | -       | 4.2.0   |

## FAQ

### How to use Typography.Link in react-router?

`react-router` support [customize](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/Link.md#component-reactcomponent) render component:

```tsx
<Link to="/" component={Typography.Link} />
```
