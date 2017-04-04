---
category: Components
type: Data Display
title: Tooltip
---

A simple text popup tip.

## When To Use

- The tip shows while mouse enter, and hides while mouse leave. The Tooltip doesn't support complex text and operation.
- It can provide an explanation of `button/text/operation` that can cover the usage of the default system `title`.

## API

| Property      | Description                                     | Type       | Default |
|-----------|------------------------------------------|------------|--------|
| title     | prompt text                                 | string/React.Element | -     |

### Common API

The following APIs are shared by Tooltip, Popconfirm, Popover.

| Property      | Description                                     | Type       | Default |
|-----------|------------------------------------------|------------|--------|
| placement | to set the position, which can be one of `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom` | string     | top    |
| getPopupContainer | to set the container of the tip, while the default is to create a `div` element in `body`. Use `getTooltipContainer` if you are using `antd@<2.5.2` | Function(triggerNode) | () => document.body |
| arrowPointAtCenter | whether arrow pointed at the center of target, supported after `antd@1.11+` | boolean | `false` |
| visible   | make the float card visible or not                     | boolean       | false  |
| onVisibleChange | callback of the visible attribute changed            | (visible) => void | none     |
| mouseEnterDelay | delay time to show when mouse enter.unit: s | number | 0 |
| mouseLeaveDelay | delay time to hide when mouse leave.unit: s | number | 0.1 |
| trigger | triggering mode: can be hover, focus, or click. | string | hover |
| overlayClassName | class name of the card                            | string | none     |
| overlayStyle | style of the card                            | object | none    |


## Note

Please ensure that the child node of `Tooltip` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` event.
