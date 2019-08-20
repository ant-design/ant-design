---
category: Components
type: Other
cols: 2
title: Anchor
---

Hyperlinks to scroll on one page.

## When To Use

For displaying anchor hyperlinks on page and jumping between them.

## API

### Anchor Props

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| affix | Fixed mode of Anchor | boolean | true |  |
| bounds | Bounding distance of anchor area | number | 5(px) |  |
| getContainer | Scrolling container | () => HTMLElement | () => window | 3.4.0 |
| offsetBottom | Pixels to offset from bottom when calculating position of scroll | number | - |  |
| offsetTop | Pixels to offset from top when calculating position of scroll | number | 0 |  |
| showInkInFixed | Whether show ink-balls in Fixed mode | boolean | false |  |
| onClick | set the handler to handle `click` event | Function(e: Event, link: Object) | - | 3.9.0 |
| getCurrentAnchor | Customize the anchor highlight | () => string | - | 3.22.0 |
| targetOffset | Anchor scroll offset, default as `offsetTop`, [example](#components-anchor-demo-targetOffset) | number | `offsetTop` | 3.22.0 |

### Link Props

| Property | Description                               | Type              | Default | Version |
| -------- | ----------------------------------------- | ----------------- | ------- | ------- |
| href     | target of hyperlink                       | string            |         |         |
| title    | content of hyperlink                      | string\|ReactNode |         |         |
| target   | Specifies where to display the linked URL | string            |         |         |
