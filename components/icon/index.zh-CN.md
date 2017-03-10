---
category: Components
subtitle: 图标
type: General
title: Icon
toc: false
---

语义化的矢量图形。

## 图标的命名规范

我们为每个图标赋予了语义化的命名，命名规则如下:

- 实心和描线图标保持同名，用 `-o` 来区分，比如 `question-circle`(实心) 和 `question-circle-o`(描线)；

- 命名顺序：`[icon名]-[形状可选]-[描线与否]-[方向可选]`。

## 如何使用

使用 `<Icon />` 标签声明组件，指定图标对应的 type 属性，示例代码如下:

```html
<Icon type="link" />
```

最终会渲染为：

```html
<i class="anticon anticon-${type}"></i>
```

## 本地部署

图标组件使用 [iconfont.cn](http://iconfont.cn)，默认公网可访问。如需本地部署，可参考 [示例](https://github.com/ant-design/antd-init/tree/master/examples/local-iconfont)。

## 图标列表

> 点击图标复制代码。

### 方向性图标

```__react
import IconSet from 'site/theme/template/IconSet';
ReactDOM.render(<IconSet className="icons" catigory="direction" />, mountNode);
```

### 提示建议性图标

```__react
import IconSet from 'site/theme/template/IconSet';
ReactDOM.render(<IconSet className="icons" catigory="suggestion" />, mountNode);
```

### 网站通用图标

```__react
import IconSet from 'site/theme/template/IconSet';
ReactDOM.render(<IconSet className="icons" catigory="other" />, mountNode);
```

### 品牌和标识

```__react
import IconSet from 'site/theme/template/IconSet';
ReactDOM.render(<IconSet className="icons" catigory="logo" />, mountNode);
```

## Props

| 参数      | 说明             | 类型      | 默认值  |
|----------|------------------|----------|--------|
| type | 图标类型 | string | - |
| spin | 是否有旋转动画 | boolean | false |
