# Alert

- category: Components
- chinese: 警告提示

---

警告提示。

## 何时使用

- 当系统需要向用户显示警告的信息时。

## API

| 参数        | 说明                                                      | 类型        | 默认值 |
|----------- |---------------------------------------------------------  | ---------- |-------|
| type       | 必选参数，指定警告提示的样式，有四种选择`success`、`info`、`warn`、`error`   | String     | 无    |
| closeText | 可选参数，关闭的文字                                       | String     | 无  |
| message    | 可选参数，标题                                           | String     | 无    |
| description | 必选参数，内容                                           | String     | 无    |
| callback   | 可选参数，关闭时触发的回调函数                             | Function    | 无    |
