## zh-CN

静态方法无法消费 Context，不能动态响应 ConfigProvider 提供的各项配置，启用 `layer` 时还可能导致样式异常。请优先使用 hooks 版本或者 App 组件提供的 `message` 实例。

## en-US

Static methods cannot consume Context provided by `ConfigProvider`. When enable `layer`, they may also cause style errors. Please use hooks version or `App` provided instance first.
