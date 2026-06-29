## zh-CN

使用 `actions` 属性可以自定义操作按钮。

当 `actions` 传入字符串数组时，会使用默认的 Button 组件，并将字符串作为按钮文本。

当 `actions` 传入 React 元素数组时，会直接使用这些元素作为操作按钮，这样你可以使用自定义的按钮组件，如本例中的带有加载状态的按钮。

注意：

1. 当使用自定义按钮时，Transfer 组件会自动处理按钮的禁用状态和点击事件。
2. 你可以在自定义按钮上添加 `disabled` 属性来控制按钮的禁用状态。
3. 你可以在自定义按钮上添加 `onClick` 事件处理函数，它会与 Transfer 组件的内部处理函数合并执行。

## en-US

You can customize operations with the `actions` prop. This example demonstrates how to customize actions, including handling disabled and loading states.

When `actions` is an array of strings, it will use the default Button component and set the strings as button text.

When `actions` is an array of React elements, it will use these elements directly as action buttons, allowing you to use custom button components, such as buttons with loading state in this example.

Note:

1. When using custom buttons, the Transfer component will automatically handle the button's disabled state and click events.
2. You can add a `disabled` property to your custom button to control its disabled state.
3. You can add an `onClick` event handler to your custom button, which will be merged with the Transfer component's internal handler.
