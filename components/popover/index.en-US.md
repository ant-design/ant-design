---
category: Components
chinese: 气泡卡片
type: Views
english: Popover
---

The bubble float card popped by clicking or hovering.   

## When to use

For more information or operations, put all into the popover card to show according to the behavior.

The difference with `Tooltip` is the popover card can provide operations and much more complicated information such as link and button.

## API

| Param     | Description   | Type     | Default value       |
|-----------|------------------------------------------|---------------|--------|
| trigger   | trigger for behavior, optional `hover/focus/click`       | string        | hover  |
| placement | position of the card，optional `top/left/right/bottom` `topLeft/topRight/bottomLeft/bottomRight` `leftTop/leftBottom/rightTop/rightBottom` | string        | top    |
| title     | title of the card                                 | React.Element | none     |
| content   | content of the card                            | React.Element | none     |
| overlayClassName | class name of the card                            | string | none     |
| overlayStyle | style of the card                            | object | none    |
| visible   | make the float card visible or not                     | boolean       | false  |
| onVisibleChange | callback of the visible attribute changed    | function      | none     |
| getTooltipContainer | rendered to the root of the menu. Default rendered to the body dom. If gets any problem of the menu while scrolling. Try to make the root the dom scrolled, and make it position relative. [Sample](http://codepen.io/anon/pen/xVBOVQ?editors=001) | Function(triggerNode) | () => document.body |
| openClassName | class name of the trigger, using for highlighting the trigger while triggered | string | ant-popover-open |
