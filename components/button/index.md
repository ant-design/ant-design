# Button

- category: Components
- chinese: 按钮
- type: 基本

---

按钮用于开始一个即时操作。

## 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。


## 如何使用

- 通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：`type` -> `shape` -> `size` -> `loading` -> `disabled`

- 按钮的属性说明如下：

属性 | 说明 | 类型 | 默认值
-----|-----|-----|------
type | 设置按钮类型，可选值为 `primary` `ghost` 或者不设 | Enum | undefined
htmlType | 设置 `button` 原生的 `type` 值，可选值请参考 HTML标准 | Enum | `button`
shape | 设置按钮形状，可选值为 `circle` `circle-outline` 或者不设 | Enum | undefined
size | 设置按钮大小，可选值为 `sm` `lg` 或者不设 | Enum | undefined
loading | 设置按钮载入状态，存在为 `true`，不存在为 `false`，或直接设置值，如：`loading="true"` | Bool | false
onClick | `click` 事件的 handler | Function | `function() {}`

- `<Button>Hello world!</Button>` 最终会被渲染为 `<button>Hello world!</button>`，并且除了上表中的属性，其它属性都会直接传到 `<button></button>`
