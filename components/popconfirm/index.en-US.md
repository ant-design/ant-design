---
category: Components
type: Views
title: Popconfirm
---

A simple and compact confirmation dialog of an action.

## When To Use

A simple and compact dialog used for asking an user confirmation.

The difference with `confirm` is more lightweight than the static popped full-screen confirm modal.

## API

| Param     | Description   | Type     | Default value       |
|-----------|------------------------------------------|---------------|--------|
| placement | position of the confirmation box, optional `top/left/right/bottom` `topLeft/topRight/bottomLeft/bottomRight` `leftTop/leftBottom/rightTop/rightBottom` | string        | top    |
| title     | title of the confirmation box                             | React.Element | none     |
| onConfirm | callback of confirmation                           | function      | none     |
| onCancel  | callback of cancel                           | function      | none     |
| onVisibleChange | callback of the visible attribute changed            | function(visible) | none     |
| okText    | text of the confirmation button                              | String        | Confirm   |
| cancelText| text of the cancel button                              | String        | Cancel   |
| openClassName | class name of the trigger, using for highlighting the trigger while triggered | string | ant-popover-open |
| arrowPointAtCenter | whether arrow pointed at the center of target, supported after `antd@1.11+` | Boolean | `false` |
