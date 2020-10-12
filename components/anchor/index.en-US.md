---
category: Components
type: Other
cols: 2
title: Anchor
cover: https://gw.alipayobjects.com/zos/alicdn/_1-C1JwsC/Anchor.svg
---

Hyperlinks to scroll on one page.

## When To Use

For displaying anchor hyperlinks on page and jumping between them.

## API

### Anchor Props

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| affix | Fixed mode of Anchor | boolean | true |  |
| bounds | Bounding distance of anchor area | number | 5 |  |
| getContainer | Scrolling container | () => HTMLElement | () => window |  |
| offsetTop | Pixels to offset from top when calculating position of scroll | number | 0 |  |
| showInkInFixed | Whether show ink-balls when `affix={false}` | boolean | false |  |
| onClick | Set the handler to handle `click` event | function(e: Event, link: Object) | - |  |
| getCurrentAnchor | Customize the anchor highlight | () => string | - |  |
| targetOffset | Anchor scroll offset, default as `offsetTop`, [example](#components-anchor-demo-targetOffset) | number | - |  |
| onChange | Listening for anchor link change | (currentActiveLink: string) => void |  |  |

### Link Props

| Property | Description                               | Type      | Default | Version |
| -------- | ----------------------------------------- | --------- | ------- | ------- |
| href     | The target of hyperlink                   | string    |         |         |
| title    | The content of hyperlink                  | ReactNode |         |         |
| target   | Specifies where to display the linked URL | string    |         |         |
