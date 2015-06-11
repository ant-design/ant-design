# Button Status

- order: 4

通过背景色透明度的变化来体现不同的操作状态

通过 `:hover` `:active` 伪状态实现，如需要表现出同 `:active` 的外观时可以添加 `.active` 类

失效状态：为 `<button>` 元素添加 `disabled` 属性，即可体现

---

````html
<button class="ant-btn ant-btn-primary">主按钮</button>
<button class="ant-btn ant-btn-primary active">主按钮(激活)</button>
<button class="ant-btn ant-btn-primary disabled">主按钮(失效)</button>
<p></p>
<button class="ant-btn">次按钮</button>
<button class="ant-btn active">次按钮(激活)</button>
<button class="ant-btn disabled">次按钮(失效)</button>
<p></p>
<button class="ant-btn ant-btn-ghost">幽灵按钮</button>
<button class="ant-btn ant-btn-ghost active">幽灵按钮(激活)</button>
<button class="ant-btn ant-btn-ghost disabled">幽灵按钮(失效)</button>
````
