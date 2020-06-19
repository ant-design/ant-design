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
| copyable | Config copy. Can set copy text and callback when is an object | boolean \| { text: string, onCopy: Function } | false |  |
| delete | Deleted line style | boolean | false |  |
| disabled | Disabled content | boolean | false |  |
| editable | Editable. Can control edit state when is object | boolean \| { editing: boolean, onStart: Function, onChange: Function(string) } | false |  |
| ellipsis | Display ellipsis when text overflows. Should set width when ellipsis needed | boolean | false |  |
| mark | Marked style | boolean | false |  |
| keyboard | Keyboard style | boolean | false | 4.3.0 |
| underline | Underlined style | boolean | false |  |
| onChange | Trigger when user edits the content | Function(string) | - |  |
| strong | Bold style | boolean | false |  |
| type | Content type | `secondary` \| `warning` \| `danger` | - |  |

### Typography.Title

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| code | Code style | boolean | false |  |
| copyable | Config copy. Can set copy text and callback when is an object | boolean \| { text: string, onCopy: Function } | false |  |
| delete | Deleted line style | boolean | false |  |
| disabled | Disabled content | boolean | false |  |
| editable | Editable. Can control edit state when is object | boolean \| { editing: boolean, onStart: Function, onChange: Function(string) } | false |  |
| ellipsis | Display ellipsis when text overflows. Can configure rows and expandable by using object | boolean \| { rows: number, expandable: boolean, onExpand: Function(event), onEllipsis: Function(ellipsis) } | false | onEllipsis: 4.2.0 |
| level | Set content importance. Match with `h1`, `h2`, `h3`, `h4` | number: 1, 2, 3, 4 | 1 |  |
| mark | Marked style | boolean | false |  |
| underline | Underlined style | boolean | false |  |
| onChange | Trigger when user edits the content | Function(string) | - |  |
| type | Content type | `secondary` \| `warning` \| `danger` | - |  |

### Typography.Paragraph

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| code | Code style | boolean | false |  |
| copyable | Config copy. Can set copy text and callback when is an object | boolean \| { text: string, onCopy: Function } | false |  |
| delete | Deleted line style | boolean | false |  |
| disabled | Disabled content | boolean | false |  |
| editable | Editable. Can control edit state when is object | boolean \| { editing: boolean, onStart: Function, onChange: Function(string) } | false |  |
| ellipsis | Display ellipsis when text overflows. Can configure rows expandable and suffix by using object | boolean \| { rows: number, expandable: boolean, suffix: string, symbol: React.ReactNode, onExpand: Function(event), onEllipsis: Function(ellipsis) } | false | onEllipsis: 4.2.0 |
| mark | Marked style | boolean | false |  |
| underline | Underlined style | boolean | false |  |
| onChange | Trigger when user edits the content | Function(string) | - |  |
| strong | Bold style | boolean | false |  |
| type | Content type | `secondary` \| `warning` \| `danger` | - |  |

## FAQ

### How to use Typography.Link in react-router?

`react-router` support [customize](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/api/Link.md#component-reactcomponent) render component:

```tsx
<Link to="/" component={Typography.Link} />
```
