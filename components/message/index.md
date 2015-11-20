# Message

- category: Components
- chinese: 全局提示
- type: 展示
- noinstant: true

---

全局展示操作反馈信息。

## 何时使用

- 可提供成功、警告和错误等反馈信息。
- 顶部居中显示并自动消失，是一种不打断用户操作的轻量级提示方式。

## API

- `message.success(content, duration)`
- `message.error(content, duration)`
- `message.info(content, duration)`
- `message.loading(content, duration)`

组件提供了三个静态方法，参数如下：

| 参数       | 说明           | 类型                       | 默认值       |
|------------|----------------|----------------------------|--------------|
| content    | 提示内容       | React.Element or String    | 无           |
| duration   | 自动关闭的延时 | number                     | 1.5          |


还提供了一个全局配置方法：

- `message.config(options)`

```js
message.config({
  top: 100
});
```

| 参数       | 说明               | 类型                       | 默认值       |
|------------|--------------------|----------------------------|--------------|
| top        | 消息距离顶部的位置 | Number                     | 24px         |
