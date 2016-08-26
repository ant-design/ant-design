---
category: Components
chinese: 气泡卡片
type: Views
english: Popover
---

The floating card popped by clicking or hovering.

## When to use

A simple and pop-up menu to provide more information and operations of an action.

Comparing with `Tooltip`, besides information `Popover` card can also provide action elements like links and buttons.

## API

| Param     | Description   | Type     | Default value       |
|-----------|------------------------------------------|---------------|--------|
| trigger | triggering mode: can be hover, focus, or click. | string | hover |
| placement | position of the card，optional `top/left/right/bottom` `topLeft/topRight/bottomLeft/bottomRight` `leftTop/leftBottom/rightTop/rightBottom` | string        | top    |
| title     | title of the card                                 | React.Element | none     |
| content   | content of the card                            | React.Element | none     |
| overlayClassName | class name of the card                            | string | none     |
| overlayStyle | style of the card                            | object | none    |
| visible   | make the float card visible or not                     | boolean       | false  |
| onVisibleChange | callback of the visible attribute changed    | function      | none     |
| getTooltipContainer | rendered to the root of the menu. Default rendered to the body dom. If gets any problem of the menu while scrolling. Try to make the root the dom scrolled, and make it position relative. [Sample](http://codepen.io/anon/pen/xVBOVQ?editors=001) | Function(triggerNode) | () => document.body |
| openClassName | class name of the trigger, using for highlighting the trigger while triggered | string | ant-popover-open |
