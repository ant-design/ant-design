# Popover

- category: Components
- chinese: 气泡卡片
- type: 展示

---

点击/鼠标移入元素，弹出气泡式的卡片浮层。

## 何时使用

当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。

和 `Tooltip` 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。


## API

| 参数      | 说明                                     | 类型          | 默认值 |
|-----------|------------------------------------------|---------------|--------|
| trigger   | 触发行为，可选 `hover/focus/click`       | string        | hover  |
| placement | 气泡框位置，可选 `top/left/right/bottom/topLeft/topRight/bottomLeft/bottomRight/leftTop/leftBottom/rightTop/rightBottom` | string        | top    |
| title     | 卡片标题                                 | React.Element | 无     |
| overlay   | 卡片内容                                 | React.Element | 无     |
| prefixCls | 浮层的类名                        | string        | ant-popover   |
| visible   | 用于手动控制浮层显隐                     | boolean       | false  |
| onVisibleChange | 显示隐藏改变的回调                 | function      | 无     |
