---
category: Components
type: Data Display
title: Tooltip
---

A simple text popup tip.

## When To Use

- The tip is shown on mouse enter, and is hidden on mouse leave. The Tooltip doesn't support complex text or operations.
- To provide an explanation of a `button/text/operation`. It's often used instead of the html `title` attribute.

## API

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| title | The text shown in the tooltip | string\|ReactNode\|() => ReactNode | - | 3.0.0 |

### Common API

The following APIs are shared by Tooltip, Popconfirm, Popover.

| Property | Description | Type | Default | Version Added |
| --- | --- | --- | --- | --- |
| arrowPointAtCenter | Whether the arrow is pointed at the center of target, supported after `antd@1.11+` | boolean | `false` | 3.0.0 |
| autoAdjustOverflow | Whether to adjust popup placement automatically when popup is off screen | boolean | `true` | 3.0.0 |
| defaultVisible | Whether the floating tooltip card is visible by default | boolean | `false` | 3.0.0 |
| getPopupContainer | The DOM container of the tip, the default behavior is to create a `div` element in `body` | Function(triggerNode) | () => document.body | 3.0.0 |
| mouseEnterDelay | Delay in seconds, before tooltip is shown on mouse enter | number | 0.1 | 3.0.0 |
| mouseLeaveDelay | Delay in seconds, before tooltip is hidden on mouse leave | number | 0.1 | 3.0.0 |
| overlayClassName | Class name of the tooltip card | string | - | 3.0.0 |
| overlayStyle | Style of the tooltip card | object | - | 3.0.0 |
| placement | The position of the tooltip relative to the target, which can be one of `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom` | string | `top` | 3.0.0 |
| trigger | Tooltip trigger mode | `hover` \| `focus` \| `click` \| `contextMenu` | `hover` | 3.0.0 |
| visible | Whether the floating tooltip card is visible or not | boolean | `false` | 3.0.0 |
| onVisibleChange | Callback executed when visibility of the tooltip card is changed | (visible) => void | - | 3.0.0 |
| align | this value will be merged into placement's config, please refer to the settings [rc-tooltip](https://github.com/react-component/tooltip) | Object | - | 3.10.0 |

## Note

Please ensure that the child node of `Tooltip` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.
