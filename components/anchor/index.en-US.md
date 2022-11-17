---
category: Components
title: Anchor
cover: https://gw.alipayobjects.com/zos/bmw-prod/669b87c5-7b44-4c99-a5ea-4c38f8004788.svg
group:
  title: Navigation
  order: 3
demo:
  cols: 2
---

Hyperlinks to scroll on one page.

## When To Use

For displaying anchor hyperlinks on page and jumping between them.

> Notes for developers
>
> After version `4.24.0`, we rewrite Anchor use FC, Some methods of obtaining `ref` and calling internal instance methods will invalid.

## Examples

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">Basic</code>
<code src="./demo/static.tsx">Static Anchor</code>
<code src="./demo/onClick.tsx">Customize the onClick event</code>
<code src="./demo/customizeHighlight.tsx">Customize the anchor highlight</code>
<code src="./demo/targetOffset.tsx">Set Anchor scroll offset</code>
<code src="./demo/onChange.tsx">Listening for anchor link change</code>

## API

### Anchor Props

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| affix | Fixed mode of Anchor | boolean | true |  |
| bounds | Bounding distance of anchor area | number | 5 |  |
| getContainer | Scrolling container | () => HTMLElement | () => window |  |
| getCurrentAnchor | Customize the anchor highlight | (activeLink: string) => string | - |  |
| offsetTop | Pixels to offset from top when calculating position of scroll | number | 0 |  |
| showInkInFixed | Whether show ink-balls when `affix={false}` | boolean | false |  |
| targetOffset | Anchor scroll offset, default as `offsetTop`, [example](#components-anchor-demo-targetOffset) | number | - |  |
| onChange | Listening for anchor link change | (currentActiveLink: string) => void |  |  |
| onClick | Set the handler to handle `click` event | function(e: Event, link: Object) | - |  |

### Link Props

| Property | Description                               | Type      | Default | Version |
| -------- | ----------------------------------------- | --------- | ------- | ------- |
| href     | The target of hyperlink                   | string    |         |         |
| target   | Specifies where to display the linked URL | string    |         |         |
| title    | The content of hyperlink                  | ReactNode |         |         |
