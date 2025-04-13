## zh-CN

通过 `notification.useNotification` 创建支持读取 context 的 `contextHolder`。请注意，我们推荐通过顶层注册的方式代替 `notification` 静态方法，因为静态方法无法消费上下文，因而 ConfigProvider 的数据也不会生效。

## en-US

Use `notification.useNotification` to get `contextHolder` with context accessible issue. Please note that, we recommend to use top level registration instead of `notification` static method, because static method cannot consume context, and ConfigProvider data will not work.
