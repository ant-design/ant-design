---
category: Components
type: Feedback
title: Popconfirm
---

A simple and compact confirmation dialog of an action.

## When To Use

A simple and compact dialog used for asking an user confirmation.

The difference with `confirm` is more lightweight than the static popped full-screen confirm modal.

## API

| Param     | Description   | Type     | Default value       |
|-----------|------------------------------------------|---------------|--------|
| title     | title of the confirmation box                             | string\|ReactNode | none     |
| onConfirm | callback of confirmation                           | function(e)      | none     |
| onCancel  | callback of cancel                           | function(e)      | none     |
| okText    | text of the confirmation button                              | string        | Confirm   |
| cancelText| text of the cancel button                              | string        | Cancel   |

Consult [Tooltip's documentation](https://ant.design/components/tooltip/#API) to find more APIs.

## Note

Please ensure that the child node of `Popconfirm` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` event.
