# Button

- category: CSS
- chinese: 按钮
- order: 2
- sketch: button.sketch

---

这是一个按钮。

## 何时使用

O(∩_∩)O

## 为什么使用

O(∩_∩)O

## 怎么使用

按钮的基础样式为 `.ant-btn`, 其中 ant 是类名空间前缀，可以自定义。

通过类组装的形式来产生不同的按钮样式，推荐遵循如下顺序：

**.ant-btn > .ant-btn-primary | .ant-btn-default | .ant-btn-ghost > .ant-btn-circle | .ant-btn-circle-outline > .ant-btn-lg | .ant-btn-sm**

按钮的样式参数说明如下：

- `.ant-btn` 

按钮基础样式, 用于初始化按钮

- `.ant-btn-primary` `.ant-btn-default` `.ant-btn-ghost` 

使用这些列出的类可以快速创建一个带有预定义样式的按钮。
 
- `.ant-btn-circle` `.ant-btn-circle-outline` 

用于创建圆形按钮，`.ant-btn-circle-outline` 为描边按钮

- `.ant-btn-lg` `.ant-btn-sm`

定义按钮大小尺寸, 目前提供三种尺寸：大中小，默认为中
