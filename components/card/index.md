---
category: Components
chinese: 卡片
type: Presentation
cols: 1
english: Card
---

通用卡片容器。

## 何时使用

最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面。

## API

```html
<Card title="卡片标题">卡片内容</Card>
```

| 参数     | 说明           | 类型     | 默认值       |
|----------|----------------|----------|--------------|
| title    | 卡片标题 | React.Element   |  -  |
| extra    | 卡片右上角的操作区域 | React.Element   | - |
| bordered | 是否有边框 | Boolean   |  true  |
| bodyStyle | 内容区域自定义样式 | Object   |  -  |
