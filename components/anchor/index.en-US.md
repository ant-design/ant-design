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

| Property     | Description           | Type     | Default      |
|--------------|-----------------------|----------|--------------|
| offsetTop    | Pixels to offset from top when calculating position of scroll | number | 0 |
| offsetBottom | Pixels to offset from bottom when calculating position of scroll | number | - |
| bounds     | Bounding distance of anchor area | number | 5(px) |
| affix | Fixed mode of Anchor | boolean | false |
| showInkInFixed | Whether show ink-balls in Fixed mode | boolean | false |

### Link Props

| Property        | Description           | Type               | Default       |
|-------------|----------------|--------------------|--------------|
| href    | target of hyperlink  | string |         |
| title | content of  hyperlink | string\|ReactNode |         |
