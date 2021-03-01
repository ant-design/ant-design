---
category: Components
type: Data Display
title: Popover
cover: https://gw.alipayobjects.com/zos/alicdn/1PNL1p_cO/Popover.svg
---

The floating card popped by clicking or hovering.

## When To Use

A simple popup menu to provide extra information or operations.

Comparing with `Tooltip`, besides information `Popover` card can also provide action elements like links and buttons.

## API

| Param | Description | Type | Default value | Version |
| --- | --- | --- | --- | --- |
| content | Content of the card | ReactNode \| () => ReactNode | - |  |
| title | Title of the card | ReactNode \| () => ReactNode | - |  |

Consult [Tooltip's documentation](/components/tooltip/#API) to find more APIs.

## Note

Please ensure that the child node of `Popover` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.
