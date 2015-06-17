# 标准按钮

- order: 1 

为 `<button>` `<a>` 或 `<input>` 元素添加 `.ant-btn` 类即可使用 ant-design 提供的样式。

另外，通过使用下面的类可创建带有预定义样式的按钮，我们通过样式来显示重要程度的不同。

`.ant-btn-primary` `.ant-btn-ghost`

其中 `.ant-btn` 类定义了按钮的默认样式，语义上代表次按钮。

**注**: 当按钮文字为两个字时，中间需要**间隔一个字符**。

---

````html
<button class="ant-btn">Button</button>
<a href="javascript:;" class="ant-btn" role="button">Link</a>
<input class="ant-btn" type="button" value="Input" />
<input class="ant-btn" type="submit" value="Submit" />

<br>

<!-- Styled Button -->
<button class="ant-btn ant-btn-primary">主按钮</button>
<button class="ant-btn">次按钮</button>
<button class="ant-btn ant-btn-ghost">幽灵按钮</button>
````
