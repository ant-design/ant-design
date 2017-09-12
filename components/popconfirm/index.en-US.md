---
category: Components
type: Feedback
title: Popconfirm
---

A simple and compact confirmation dialog of an action.

## When To Use

A simple and compact dialog used for asking for user confirmation.

The difference with the `confirm` modal dialog is that it's more lightweight than the static popped full-screen confirm modal.

## API

| Param     | Description   | Type     | Default value       |
|-----------|------------------------------------------|---------------|--------|
| title     | title of the confirmation box            | string\|ReactNode | -     |
| onConfirm | callback of confirmation                | function(e)      | -     |
| onCancel  | callback of cancel                       | function(e)      | -     |
| okText    | text of the Confirm button               | string        | `Confirm`   |
| okType    | Button `type` of the Confirm button      | string        | `primary`   |
| cancelText| text of the Cancel button                | string        | `Cancel`   |

Consult [Tooltip's documentation](https://ant.design/components/tooltip/#API) to find more APIs.

## Note

Please ensure that the child node of `Popconfirm` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.
