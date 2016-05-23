---
category: Components
chinese: 警告提示
type: Presentation
english: Alert
---

警告提示，展现需要关注的信息。

## 何时使用

- 当某个页面需要向用户显示警告的信息时。
- 非浮层的静态展现形式，始终展现，不会自动消失，用户可以点击关闭。

## API

| 参数        | 说明                                                      | 类型        | 默认值 |
|----------- |---------------------------------------------------------  | ---------- |-------|
| type       | 必选参数，指定警告提示的样式，有四种选择 `success`、`info`、`warning`、`error`   | String     | `info`    |
| closable   | 可选参数，默认不显示关闭按钮                                  | Boolean   | 无    |
| closeText  | 可选参数，自定义关闭按钮                                     | React.Node   | 无    |
| message    | 必选参数，警告提示内容                                       | React.Node   | 无    |
| description | 可选参数，警告提示的辅助性文字介绍                            | React.Node   | 无    |
| onClose     | 可选参数，关闭时触发的回调函数                                | Function   | 无    |
| showIcon   | 可选参数，是否显示辅助图标                                 | Boolean   | false    |
