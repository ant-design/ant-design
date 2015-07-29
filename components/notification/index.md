# Notification

- category: Components
- chinese: 通知提醒框

---

全局展示通知提醒信息。

## 何时使用

- 当系统需要在窗口右上角显示通知提醒信息时。

## API

| 参数        | 说明                                            | 类型         | 默认值 |
|----------- |---------------------------------------------    | ----------- |--------|
| message    | 通知提醒标题，必选                                 | String      | 无     |
| description | 通知提醒内容，必选                                | String      | 无     |
| icon       | 框的左侧有Icon                                    | Boolean     | false  |
| btn        | 自定义关闭按钮的文字                                | String      | 无     |
| defaultClose  | 默认关闭按钮关闭时触发的回调函数                   | Function    | 无     |
| customClose   | 自定义关闭按钮关闭时触发的回调函数                 | Function    | 无     |
