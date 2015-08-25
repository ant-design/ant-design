# Button

- category: Components
- chinese: 按钮
- type: 基本

---

按钮用于开始一个即时操作。

## 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。


## 如何使用

- 按钮的基础样式为 `ant-btn`。

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
| `.ant-btn`  | 按钮基础样式。 |
| `.ant-btn-primary` `.ant-btn-ghost`  | 使用这些列出的类可以快速创建一个带有预定义样式的按钮。  |
| `.ant-btn-circle` `.ant-btn-circle-outline`  | 用于创建圆形按钮，`.ant-btn-circle-outline` 为描边按钮。 |
| `.ant-btn-lg` `.ant-btn-sm`  | 定义按钮大小尺寸，目前提供三种尺寸：大中小，默认为中。 |
| `.ant-btn-group` | 按钮组合，通过按钮组容器把一组按钮放在同一行里。 |

> 当按钮只有两个汉字时，需要在两字中加空格。
