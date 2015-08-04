# Notification

- category: Components
- chinese: 通知提醒框

---

全局展示通知提醒信息。

## 何时使用

- 当系统需要在窗口右上角显示通知提醒信息时。

## API

- `notification.success(config)`
- `notification.error(config)`
- `notification.info(config)`
- `notification.warn(config)`
- `notification.open(config)`
- `notification.close(key: String)`

config 参数如下：

| 参数        | 说明                                            | 类型         | 默认值 |
|----------- |---------------------------------------------    | ----------- |--------|
| message    | 通知提醒标题，必选                                 | React.Element or String      | 无     |
| description | 通知提醒内容，必选                                | React.Element or String      | 无     |
| btn        | 自定义关闭按钮                                    | React.Element      | 无     |
| key        | 当前通知唯一标志                               | String      | 无     |
| onClose    | 点击默认关闭按钮时触发的回调函数                     | Function    | 无     |


还提供了一个全局配置方法：

- `notification.config(options)`

```js
message.config({
  top: 100
});
```

| 参数       | 说明               | 类型                       | 默认值       |
|------------|--------------------|----------------------------|--------------|
| top        | 消息距离顶部的位置 | Number                     | 24px         |
