---
category: Components
type: Data Display
title: Tooltip
cover: https://gw.alipayobjects.com/zos/alicdn/Vyyeu8jq2/Tooltp.svg
---

A simple text popup tip.

## When To Use

- The tip is shown on mouse enter, and is hidden on mouse leave. The Tooltip doesn't support complex text or operations.
- To provide an explanation of a `button/text/operation`. It's often used instead of the html `title` attribute.

## API

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| title | The text shown in the tooltip | ReactNode \| () => ReactNode | - |

### Common API

The following APIs are shared by Tooltip, Popconfirm, Popover.

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| align | This value will be merged into placement's config, please refer to the settings [rc-tooltip](https://github.com/react-component/tooltip) | object | - |  |
| arrowPointAtCenter | Whether the arrow is pointed at the center of target | boolean | false |  |
| autoAdjustOverflow | Whether to adjust popup placement automatically when popup is off screen | boolean | true |  |
| color | The background color | string | - | 4.3.0 |
| defaultVisible | Whether the floating tooltip card is visible by default | boolean | false |  |
| destroyTooltipOnHide | Whether destroy tooltip when hidden, parent container of tooltip will be destroyed when `keepParent` is false | boolean \| { keepParent?: boolean } | false |  |
| getPopupContainer | The DOM container of the tip, the default behavior is to create a `div` element in `body` | function(triggerNode) | () => document.body |  |
| mouseEnterDelay | Delay in seconds, before tooltip is shown on mouse enter | number | 0.1 |  |
| mouseLeaveDelay | Delay in seconds, before tooltip is hidden on mouse leave | number | 0.1 |  |
| overlayClassName | Class name of the tooltip card | string | - |  |
| overlayStyle | Style of the tooltip card | object | - |  |
| placement | The position of the tooltip relative to the target, which can be one of `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom` | string | `top` |  |
| trigger | Tooltip trigger mode. Could be multiple by passing an array | `hover` \| `focus` \| `click` \| `contextMenu` \| Array&lt;string> | `hover` |  |
| visible | Whether the floating tooltip card is visible or not | boolean | false |  |
| onVisibleChange | Callback executed when visibility of the tooltip card is changed | (visible) => void | - |  |

## Note

Please ensure that the child node of `Tooltip` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.
