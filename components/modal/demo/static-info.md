## zh-CN

在绝大多数场景，都不需要静态方法。它无法消费 context，例如无法响应动态主题。请优先使用 hooks 版本或者 `App` 组件提供的 Modal 实例。如果同时启用了 `layer` ，静态方法还可能导致 `@layer antd` 具有错误的优先级。

## en-US

In most case, you do not need static method. It can not consume context like dynamic theme. Please use hooks version or `App` provided instance first. When enable `layer`, static methods may also cause `@layer antd` has wrong precedence.
