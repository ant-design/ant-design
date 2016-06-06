---
category: Components
chinese: 气泡确认框
type: Presentation
english: Popconfirm
---

点击元素，弹出气泡式的确认框。

## 何时使用

目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。

和 `confirm` 弹出的全屏居中模态对话框相比，交互形式更轻量。


## API

| 参数      | 说明                                     | 类型          | 默认值 |
|-----------|------------------------------------------|---------------|--------|
| placement | 气泡框位置，可选 `top/left/right/bottom` `topLeft/topRight/bottomLeft/bottomRight` `leftTop/leftBottom/rightTop/rightBottom` | string        | top    |
| title     | 确认框的描述                             | React.Element | 无     |
| onConfirm | 点击确认的回调                           | function      | 无     |
| onCancel  | 点击取消的回调                           | function      | 无     |
| onVisibleChange | 显示隐藏的回调                      | function(visible) | 无     |
| okText    | 确认按钮文字                              | String        | 确定   |
| cancelText| 取消按钮文字                              | String        | 取消   |
| openClassName | 气泡框展现时触发器添加的类名，可用于打开浮层时高亮触发器 | string | ant-popover-open |
