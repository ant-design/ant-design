---
category: Components
chinese: 气泡卡片
type: Presentation
english: Popover
---

点击/鼠标移入元素，弹出气泡式的卡片浮层。

## 何时使用

当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。

和 `Tooltip` 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。

## API

| 参数      | 说明                                     | 类型          | 默认值 |
|-----------|------------------------------------------|---------------|--------|
| trigger   | 触发行为，可选 `hover/focus/click`       | string        | hover  |
| placement | 气泡框位置，可选 `top/left/right/bottom` `topLeft/topRight/bottomLeft/bottomRight` `leftTop/leftBottom/rightTop/rightBottom` | string        | top    |
| title     | 卡片标题                                 | React.Element | 无     |
| content   | 卡片内容                            | React.Element | 无     |
| overlayClassName | 卡片类名                            | string | 无     |
| overlayStyle | 卡片样式                            | object | 无     |
| visible   | 用于手动控制浮层显隐                     | boolean       | false  |
| onVisibleChange | 显示隐藏改变的回调                 | function      | 无     |
| getTooltipContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](http://codepen.io/anon/pen/xVBOVQ?editors=001) | Function(triggerNode) | () => document.body |
| openClassName | 气泡框展现时触发器添加的类名，可用于打开浮层时高亮触发器 | string | ant-popover-open |
