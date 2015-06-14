# Button

- category: CSS
- chinese: 按钮
- order: 2

---

## 何时使用

如果你想为 `<a>` `<button>` 或 `<input>` 元素添加按钮类（button class）时，那你就愉快得使用吧。

## 如何使用

- 按钮的基础样式为 `ant-btn`。

  在这里我们统一使用 **ant** 作为类名空间，当然你也可以自定义(通过覆盖 `@css-prefix` 变量即可)。

- 通过类组装的形式来产生不同的按钮样式，推荐遵循如下顺序：
```
  .ant-btn
  	&darr;
  .ant-btn-primary | .ant-btn-ghost  
  	&darr;
  .ant-btn-circle | .ant-btn-circle-outline  
  	&darr;
  .ant-btn-lg | .ant-btn-sm
 ```

- 按钮的样式参数说明如下：

| 类名  | 说明 |
| ------------- | ------------- |
| `.ant-btn`  | 按钮基础样式 |
| `.ant-btn-primary` `.ant-btn-ghost`  | 使用这些列出的类可以快速创建一个带有预定义样式的按钮。  |
| `.ant-btn-circle` `.ant-btn-circle-outline`  | 用于创建圆形按钮，`.ant-btn-circle-outline` 为描边按钮 |
| `.ant-btn-lg` `.ant-btn-sm`  | 定义按钮大小尺寸, 目前提供三种尺寸：大中小，默认为中 |
| `.ant-btn-group` | 按钮组合，通过按钮组容器把一组按钮放在同一行里 |
