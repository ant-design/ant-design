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
| icon       | 通知提醒框的左侧Icon，默认没有，有四种选择`success`、`info`、`warn`、`error` | String | 无     |
| btn        | 自定义关闭按钮                                    | String      | 无     |
| top        | 通知提醒框距离顶部的距离， **只在初始化时设置有效** ，默认`24`           | Number      | 24     |
| onClose    | 点击默认关闭按钮时触发的回调函数                     | Function    | 无     |

## 注意

- 当需要自定义通知提醒框距离浏览器窗口顶部的距离时，必须在 **第一次** `notification.open()` 前设置才有效
    ```jsx
    notification.config({
      top: 24
    });
    notification.open(args);
    ```