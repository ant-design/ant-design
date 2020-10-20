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
| getCurrentAnchor | Customize the anchor highlight | () => string | - |  |
| offsetTop | Pixels to offset from top when calculating position of scroll | number | 0 |  |
| onChange | Listening for anchor link change | (currentActiveLink: string) => void |  |  |
| onClick | Set the handler to handle `click` event | function(e: Event, link: Object) | - |  |
| showInkInFixed | Whether show ink-balls when `affix={false}` | boolean | false |  |
| targetOffset | Anchor scroll offset, default as `offsetTop`, [example](#components-anchor-demo-targetOffset) | number | - |  |

### Link Props

| Property | Description                               | Type      | Default | Version |
| -------- | ----------------------------------------- | --------- | ------- | ------- |
| href     | The target of hyperlink                   | string    |         |         |
| target   | Specifies where to display the linked URL | string    |         |         |
| title    | The content of hyperlink                  | ReactNode |         |         |
