---
category: Components
chinese: 通知提醒框
type: Presentation
noinstant: true
english: Notification
---

全局展示通知提醒信息。

## 何时使用

在系统右上角显示通知提醒信息。经常用于以下情况：

- 较为复杂的通知内容。
- 带有交互的通知，给出用户下一步的行动点。
- 系统主动推送。

## API

- `notification.success(config)`
- `notification.error(config)`
- `notification.info(config)`
- `notification.warning(config)`
- `notification.warn(config)`
- `notification.close(key: String)`
- `notification.destroy()`

config 参数如下：

| 参数        | 说明                                            | 类型         | 默认值 |
|----------- |---------------------------------------------    | ----------- |--------|
| message    | 通知提醒标题，必选                                 | React.Element or String      | 无     |
| description | 通知提醒内容，必选                                | React.Element or String      | 无     |
| btn        | 自定义关闭按钮                                    | React.Element      | 无     |
| key        | 当前通知唯一标志                                   | String      | 无     |
| onClose    | 点击默认关闭按钮时触发的回调函数                     | Function    | 无     |
| duration   | 默认 4.5 秒后自动关闭，配置为 null 则不自动关闭         | Number    | 4.5     |

还提供了一个全局配置方法，在调用前提前配置，全局一次生效。

- `notification.config(options)`

```js
notification.config({
  top: 100,
  duration: 3,
});
```

| 参数       | 说明               | 类型                       | 默认值       |
|------------|--------------------|----------------------------|--------------|
| top        | 消息距离顶部的位置 | Number                     | 24px         |
| duration   | 默认自动关闭延时，单位秒 | Number                   | 4.5         |
