## zh-CN

自定义或第三方的表单控件，也可以与 Form 组件一起使用。只要该组件遵循以下的约定：

> - 提供受控属性 `value` 或其它与 [`valuePropName`](#formitem) 的值同名的属性。
> - 提供 `onChange` 事件或 [`trigger`](#formitem) 的值同名的事件。
> - 转发 ref 或者传递 id 属性到 dom 以支持 `scrollToField` 方法。

## en-US

Customized or third-party form controls can be used in Form, too. Controls must follow these conventions:

> - It has a controlled property `value` or other name which is equal to the value of [`valuePropName`](#formitem).
> - It has event `onChange` or an event which name is equal to the value of [`trigger`](#formitem).
> - Forward the ref or pass the id property to dom to support the `scrollToField` method.
