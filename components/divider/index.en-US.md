---
category: Components
title: Divider
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*7sMiTbzvaDoAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*KPSEQ74PLg4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: Layout
  order: 2
---

A divider line separates different content.

## When To Use

- Divide sections of article.
- Divide inline text and links such as the operation column of table.

## Examples

<!-- prettier-ignore -->
<code src="./demo/horizontal.tsx">Horizontal</code>
<code src="./demo/with-text.tsx">Divider with title</code>
<code src="./demo/plain.tsx">Text without heading style</code>
<code src="./demo/vertical.tsx">Vertical</code>
<code src="./demo/customize-style.tsx" debug>Style Customization</code>
<code src="./demo/component-token.tsx" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| children | The wrapped title | ReactNode | - |  |
| className | The className of container | string | - |  |
| dashed | Whether line is dashed | boolean | false |  |
| orientation | The position of title inside divider | `left` \| `right` \| `center` | `center` |  |
| orientationMargin | The margin-left/right between the title and its closest border, while the `orientation` must be `left` or `right`, If a numeric value of type `string` is provided without a unit, it is assumed to be in pixels (px) by default. | string \| number | - |  |
| plain | Divider text show as plain style | boolean | true | 4.2.0 |
| style | The style object of container | CSSProperties | - |  |
| type | The direction type of divider | `horizontal` \| `vertical` | `horizontal` |  |

## Design Token

<ComponentTokenTable component="Divider"></ComponentTokenTable>
