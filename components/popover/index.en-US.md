---
category: Components
type: Data Display
title: Popover
---

The floating card popped by clicking or hovering.

## When To Use

A simple popup menu to provide extra information or operations.

Comparing with `Tooltip`, besides information `Popover` card can also provide action elements like links and buttons.

## API

| Param     | Description   | Type     | Default value       |
|-----------|------------------------------------------|---------------|--------|
| title     | title of the card                                 | string\|ReactNode | none     |
| content   | content of the card                            | string\|ReactNode | none     |

Consult [Tooltip's documentation](https://ant.design/components/tooltip/#API) to find more APIs.

## Note

Please ensure that the child node of `Popover` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` event.
