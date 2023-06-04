---
category: Components
group: Data Display
title: Tag
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*_SBsSrKLg00AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*JPNAQYrVkYkAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

Tag for categorizing or markup.

## When To Use

- It can be used to tag by dimension or property.

- When categorizing.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/colorful.tsx">Colorful Tag</code>
<code src="./demo/colorful-inverse.tsx" debug>Inverse Colorful Tag</code>
<code src="./demo/control.tsx">Add & Remove Dynamically</code>
<code src="./demo/checkable.tsx">Checkable</code>
<code src="./demo/animation.tsx">Animate</code>
<code src="./demo/icon.tsx">Icon</code>
<code src="./demo/status.tsx">Status Tag</code>
<code src="./demo/borderless.tsx">borderless</code>
<code src="./demo/borderlessLayout.tsx" debug>borderless in layout</code>
<code src="./demo/customize.tsx" debug>Customize close</code>
<code src="./demo/draggable.tsx">Draggable Tag</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

### Tag

| Property  | Description                          | Type        | Default | Version |
| --------- | ------------------------------------ | ----------- | ------- | ------- |
| closable  | Whether the Tag can be closed        | boolean     | false   |         |
| closeIcon | Custom close icon                    | ReactNode   | -       | 4.4.0   |
| color     | Color of the Tag                     | string      | -       |         |
| icon      | Set the icon of tag                  | ReactNode   | -       |         |
| bordered  | Whether has border style             | boolean     | true    | 5.4.0   |
| onClose   | Callback executed when tag is closed | (e) => void | -       |         |

### Tag.CheckableTag

| Property | Description                                     | Type              | Default |
| -------- | ----------------------------------------------- | ----------------- | ------- |
| checked  | Checked status of Tag                           | boolean           | false   |
| onChange | Callback executed when Tag is checked/unchecked | (checked) => void | -       |

## Design Token

<ComponentTokenTable component="Tag"></ComponentTokenTable>
