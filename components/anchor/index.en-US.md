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

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| affix | Fixed mode of Anchor | boolean | true | 3.0.0 |
| bounds | Bounding distance of anchor area | number | 5(px) | 3.0.0 |
| getContainer | Scrolling container | () => HTMLElement | () => window | 3.4.0 |
| offsetBottom | Pixels to offset from bottom when calculating position of scroll | number | - | 3.0.0 |
| offsetTop | Pixels to offset from top when calculating position of scroll | number | 0 | 3.0.0 |
| showInkInFixed | Whether show ink-balls in Fixed mode | boolean | false | 3.0.0 |
| onClick | set the handler to handle `click` event | Function(e: Event, link: Object) | - | 3.9.0 |

### Link Props

| Property | Description          | Type              | Default | Version Added |
| -------- | -------------------- | ----------------- | ------- | ------------- |
| href     | target of hyperlink  | string            |         | 3.0.0         |
| title    | content of hyperlink | string\|ReactNode |         | 3.0.0         |
