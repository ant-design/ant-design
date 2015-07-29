# Alert

- category: Components
- chinese: 警告提示

---

警告提示。

## 何时使用

- 当系统需要向用户显示警告的信息时。
- 始终展现，不会自动消失，用户可以点击关闭。

## API

| 参数        | 说明                                                      | 类型        | 默认值 |
|----------- |---------------------------------------------------------  | ---------- |-------|
| type       | 必选参数，指定警告提示的样式，有四种选择`success`、`info`、`warn`、`error`   | String     | 无    |
| closable   | 可选参数，值为字符串`true`时显示关闭按钮，默认不显示             | String     | 无   |
| closeText  | 可选参数，自定义关闭                                         | String     | 无    |
| message    | 必选参数，警告提示内容                                       | String     | 无    |
| description | 可选参数，警告提示的辅助性文字介绍                            | String     | 无    |
| onClose     | 可选参数，关闭时触发的回调函数                               | Function   | 无    |
