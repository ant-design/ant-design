---
category: Components
type: Views
title: Tooltip
---

A simple text popup tip.

## When To Use

- The tip shows while mouse enter, and hides while mouse leave, the ToolTip doesn't support complex text and operation.  

- It can provide a explain of `button/text/opration`, that can cover the usage of the default system `title`. 

## API

| Property      | Description                                     | Type       | Default |
|-----------|------------------------------------------|------------|--------|
| placement | to set the position, which can be one of `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom` | string     | top    |
| title     | prompt text                                 | string/React.Element | -     |
| getTooltipContainer | to set the container of the tip, while the default is to create a `div` element in `body` | Function(triggerNode) | () => document.body |

You can visit https://github.com/react-component/tooltip for more API.
