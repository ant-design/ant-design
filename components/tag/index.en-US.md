---
category: Components
group: Data Display
title: Tag
description: Used for marking and categorization.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*_SBsSrKLg00AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*JPNAQYrVkYkAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## When To Use

- It can be used to tag by dimension or property.

- When categorizing.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/colorful.tsx">Colorful Tag</code>
<code src="./demo/control.tsx">Add & Remove Dynamically</code>
<code src="./demo/checkable.tsx">Checkable</code>
<code src="./demo/animation.tsx">Animate</code>
<code src="./demo/icon.tsx">Icon</code>
<code src="./demo/status.tsx">Status Tag</code>
<code src="./demo/customize.tsx" debug>Customize close</code>
<code src="./demo/draggable.tsx">Draggable Tag</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>
<code src="./demo/disabled.tsx" debug>Disabled</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Tag

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| classNames | Custom semantic structure class names | Record<SemanticDOM, string> \| (info: { props }) => Record<SemanticDOM, string> | - |  |
| closeIcon | Custom close icon. 5.7.0: close button will be hidden when setting to `null` or `false` | ReactNode | false | 4.4.0 |
| color | Color of the Tag | string | - |  |
| disabled | Whether the tag is disabled | boolean | false | 6.0.0 |
| href | The address to jump when clicking, when this property is specified, the `tag` component will be rendered as an `<a>` tag | string | - | 6.0.0 |
| icon | Set the icon of tag | ReactNode | - |  |
| onClose | Callback executed when tag is closed (can be prevented by `e.preventDefault()`) | (e: React.MouseEvent<HTMLElement, MouseEvent>) => void | - |  |
| styles | Custom semantic structure styles | Record<SemanticDOM, CSSProperties> \| (info: { props }) => Record<SemanticDOM, CSSProperties> | - |  |
| target | Same as target attribute of a, works when href is specified | string | - | 6.0.0 |
| variant | Variant of the tag | `'filled' \| 'solid' \| 'outlined'` | `'filled'` | 6.0.0 |
| styles | Semantic DOM style | [Record<SemanticDOM, CSSProperties>](#semantic-dom) | - |  |
| target | The target attribute of the a tag, which takes effect when href is specified | string | - | 6.0.0 |
| onClose | Callback executed when tag is closed | (e: React.MouseEvent<HTMLElement, MouseEvent>) => void | - |  |

### Tag.CheckableTag

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| checked | Checked status of Tag | boolean | false |  |
| icon | Set the icon of tag | ReactNode | - | 5.27.0 |
| onChange | Callback executed when Tag is checked/unchecked | (checked) => void | - |  |

### Tag.CheckableTagGroup

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| classNames | Semantic DOM class | [Record<SemanticDOM, string>](#semantic-dom) | - |  |
| defaultValue | Initial value | `string \| number \| Array<string \| number> \| null` | - |  |
| disabled | Disable check/uncheck | `boolean` | - |  |
| mode | Select mode | `'radio' \| 'checkbox'` | `'radio'` |  |
| styles | Semantic DOM style | [Record<SemanticDOM, CSSProperties>](#semantic-dom) | - |  |
| value | Value of checked tag(s) | `string \| number \| Array<string \| number> \| null` | - |  |
| options | Option list | `Array<{ label: ReactNode; value: string \| number } \| string \| number>` | - |  |
| onChange | Callback when Tag is checked/unchecked | `(value: string \| number \| Array<string \| number> \| null) => void` | - |  |

## Semantic DOM

### Tag

<code src="./demo/_semantic.tsx" simplify="true"></code>

### Tag.CheckableTagGroup

<code src="./demo/_semantic_group.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Tag"></ComponentTokenTable>
