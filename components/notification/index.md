# Notification

- category: Components
- chinese: 通知框

---

全局展示通知信息。

## 何时使用

- 当系统需要在窗口右上角显示通知信息时。

## API

| 参数        | 说明                                            | 类型         | 默认值 |
|----------- |---------------------------------------------    | ------------ |--------|
| message    | 通知内容，必选                                     | String      | 无     |
| close      | 关闭按钮                                          | Boolean     | false  |
| duration   | 自动关闭的延时，`null`、`0`表示不自动关闭，默认`1.5`秒 | Number       | 1.5    |
