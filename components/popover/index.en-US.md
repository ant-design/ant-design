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

| Param   | Description         | Type              | Default value | Version Added |
| ------- | ------------------- | ----------------- | ------------- | ------------- |
| content | Content of the card | string\|ReactNode | -             | 3.0.0         |
| title   | Title of the card   | string\|ReactNode | -             | 3.0.0         |

Consult [Tooltip's documentation](https://ant.design/components/tooltip/#API) to find more APIs.

## Note

Please ensure that the child node of `Popover` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.
