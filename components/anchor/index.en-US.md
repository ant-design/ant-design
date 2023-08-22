---
category: Components
title: Anchor
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*TBTSR4PyVmkAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*JGb3RIzyOCkAAAAAAAAAAAAADrJ8AQ/original
demo:
group:
  title: Navigation
  order: 3
---

Hyperlinks to scroll on one page.

## When To Use

For displaying anchor hyperlinks on page and jumping between them.

> Notes for developers
>
> After version `4.24.0`, we rewrite Anchor use FC, Some methods of obtaining `ref` and calling internal instance methods will invalid.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx" iframe="200">Basic</code>
<code src="./demo/horizontal.tsx" iframe="200">Horizontal Anchor</code>
<code src="./demo/static.tsx" >Static Anchor</code>
<code src="./demo/onClick.tsx">Customize the onClick event</code>
<code src="./demo/customizeHighlight.tsx">Customize the anchor highlight</code>
<code src="./demo/targetOffset.tsx" iframe="200">Set Anchor scroll offset</code>
<code src="./demo/onChange.tsx">Listening for anchor link change</code>
<code src="./demo/replace.tsx" iframe="200">Replace href in history</code>
<code src="./demo/legacy-anchor.tsx" debug>Deprecated JSX demo</code>
<code src="./demo/component-token.tsx" iframe="800" debug>Component Token</code>

## API

Common props ref：[Common props](/docs/react/common-props)

### Anchor Props

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| affix | Fixed mode of Anchor | boolean | true |  |
| bounds | Bounding distance of anchor area | number | 5 |  |
| getContainer | Scrolling container | () => HTMLElement | () => window |  |
| getCurrentAnchor | Customize the anchor highlight | (activeLink: string) => string | - |  |
| offsetTop | Pixels to offset from top when calculating position of scroll | number | 0 |  |
| showInkInFixed | Whether show ink-square when `affix={false}` | boolean | false |  |
| targetOffset | Anchor scroll offset, default as `offsetTop`, [example](#components-anchor-demo-targetoffset) | number | - |  |
| onChange | Listening for anchor link change | (currentActiveLink: string) => void |  |  |
| onClick | Set the handler to handle `click` event | (e: MouseEvent, link: object) => void | - |  |
| items | Data configuration option content, support nesting through children | { key, href, title, target, children }\[] [see](#anchoritem) | - | 5.1.0 |
| direction | Set Anchor direction | `vertical` \| `horizontal` | `vertical` | 5.2.0 |
| replace | Replace items' href in browser history instead of pushing it | boolean | false | 5.7.0 |

### AnchorItem

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| key | The unique identifier of the Anchor Link | string \| number | - |  |
| href | The target of hyperlink | string |  |  |
| target | Specifies where to display the linked URL | string |  |  |
| title | The content of hyperlink | ReactNode |  |  |
| children | Nested Anchor Link, `Attention: This attribute does not support horizontal orientation` | [AnchorItem](#anchoritem)\[] | - |  |
| replace | Replace item href in browser history instead of pushing it | boolean | false | 5.7.0 |

### Link Props

We recommend using the items form instead.

| Property | Description                               | Type      | Default | Version |
| -------- | ----------------------------------------- | --------- | ------- | ------- |
| href     | The target of hyperlink                   | string    |         |         |
| target   | Specifies where to display the linked URL | string    |         |         |
| title    | The content of hyperlink                  | ReactNode |         |         |

## Design Token

<ComponentTokenTable component="Anchor"></ComponentTokenTable>
