---
category: Components
title: Divider
description: A divider line separates different content.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*7sMiTbzvaDoAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*KPSEQ74PLg4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: Layout
  order: 2
---

## When To Use

- Divide sections of an article.
- Divide inline text and links such as the operation column of table.

## Examples

<!-- prettier-ignore -->
<code src="./demo/horizontal.tsx">Horizontal</code>
<code src="./demo/with-text.tsx">Divider with title</code>
<code src="./demo/size.tsx" version="5.25.0">Set the spacing size of the divider</code>
<code src="./demo/plain.tsx">Text without heading style</code>
<code src="./demo/vertical.tsx">Vertical</code>
<code src="./demo/customize-style.tsx" debug>Style Customization</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>
<code src="./demo/variant.tsx">Variant</code>
<code src="./demo/style-class.tsx" version="6.0.0">Custom semantic dom styling</code>

## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| children | The wrapped title | ReactNode | - |  |
| className | The className of container | string | - |  |
| classNames | Customize class for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| dashed | Whether line is dashed | boolean | false |  |
| orientation | Whether line is horizontal or vertical | `horizontal` \| `vertical` | `horizontal` | - |
| ~~orientationMargin~~ | The margin-left/right between the title and its closest border, while the `titlePlacement` should not be `center`, If a numeric value of type `string` is provided without a unit, it is assumed to be in pixels (px) by default. | string \| number | - |  |
| plain | Divider text show as plain style | boolean | true | 4.2.0 |
| style | The style object of container | CSSProperties | - |  |
| styles | Customize inline style for each semantic structure inside the component. Supports object or function. | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| size | The size of divider. Only valid for horizontal layout | `small` \| `middle` \| `large` | - | 5.25.0 |
| titlePlacement | The position of title inside divider | `start` \| `end` \| `center` | `center` | - |
| ~~type~~ | The direction type of divider | `horizontal` \| `vertical` | `horizontal` | - |
| variant | Whether line is dashed, dotted or solid | `dashed` \| `dotted` \| `solid` | solid | 5.20.0 |
| vertical | Orientation, Simultaneously configure with `orientation` and prioritize `orientation` | boolean | false | - |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## Design Token

<ComponentTokenTable component="Divider"></ComponentTokenTable>
