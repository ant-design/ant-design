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

| Param | Description | Type | Default value |
| --- | --- | --- | --- |
| cancelText | text of the Cancel button | string | `Cancel` |
| okText | text of the Confirm button | string | `OK` |
| okType | Button `type` of the Confirm button | string | `primary` |
| title | title of the confirmation box | string\|ReactNode | - |
| onCancel | callback of cancel | function(e) | - |
| onConfirm | callback of confirmation | function(e) | - |
| icon | customize icon of confirmation | ReactNode | `<ExclamationCircle />` |
| disabled | is show popconfirm when click its childrenNode | boolean | false |

Consult [Tooltip's documentation](https://ant.design/components/tooltip/#API) to find more APIs.

## Note

Please ensure that the child node of `Popconfirm` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.
