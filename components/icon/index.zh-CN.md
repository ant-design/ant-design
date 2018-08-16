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

- 实心和描线图标保持同名，用 `-o` 来区分，比如 `question-circle`（实心） 和 `question-circle-o`（描线）；
- 命名顺序：`[图标名]-[形状?]-[描线?]-[方向?]`。

> `?` 为可选。

完整的图标设计规范请访问 [图标规范](/docs/spec/icon)。

## 图标列表

> Click the icon and copy the code。

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

### 品牌与标识

```__react
import IconSet from 'site/theme/template/IconSet';
ReactDOM.render(<IconSet className="icons" catigory="logo" />, mountNode);
```

## API

### Icon

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 图标类型，遵循图标的命名规范 | string | - |
| rotate | 设置图标顺时针旋转的角度，使用角度制 | number | - |
| flip | 翻转图标，可进行水平、垂直翻转 | 'horizontal' \| 'vertical' \| 'both' | - |
| tag | 设置图标容器的标签 | string | 'i' |
| style | 设置图标的样式，例如 `fontSize` 和 `color` | CSSProperties | - |
| svgStyle | 设置图标本身`<svg>`标签的样式，会覆盖`flip`和`rotate`的效果 | CSSProperties | - |
| svgClassName | 为图标本身`<svg>`标签设置额外的类名 | string | - |
| spin | 是否有旋转动画 | boolean | false |
| viewBox | 设置自定义图标[视图容器盒](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/viewBox)的大小，对自定义图标有效，**对 Ant Design 内置图标无效** | string | '0 0 1024 1024' |
| component | 控制如何渲染图标，通常是一个渲染为 `<svg>` 标签的 `React` 组件，**会使 `type` 属性失效** | ComponentType<CustomIconComponentProps\> | - |

所有的图标都会以 `<svg>` 标签渲染，可以使用 `style` 和 `className` 设置图标的大小和单色图标的颜色。例如：

```jsx
<Icon type="message" style={{ fontSize: '16px', color: '#08c' }} />
```

如果您使用 `webpack`，可以通过配置 [@svgr/webpack](https://www.npmjs.com/package/@svgr/webpack) 来将 `svg` 图标作为 `React` 组件导入

```js
// webpack.config.js
{
  test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
  use: [
    {
      loader: 'babel-loader',
    },
    {
      loader: '@svgr/webpack',
      options: {
        babel: false,
        icon: true,
      },
    },
  ],
}
```

之后直接导入即可


```jsx
import { Icon } from 'antd';
import MessageSvg from 'path/to/message.svg'; // path to your '*.svg' file.

ReactDOM.render(
  <Icon component={MessageSvg} />,
  mountNode
);
```

#### CustomIconComponentProps

`Icon` 中的 `component` 组件属性如下：

| 字段 | 说明 | 类型 | 只读值 |
| --- | --- | --- | --- |
| width | `svg` 元素宽度 | string \| number | '1em' |
| height | `svg` 元素高度 | string \| number | '1em' |
| fill | `svg` 元素填充的颜色 | string | 'currentColor' |
| viewBox | 图标[视图容器盒](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/viewBox)的大小，继承自自定义组件的 `viewBox` 属性 | string | - |
| className | 计算后的 `svg` 类名 | string | - |
| style | 计算后的 `svg` 元素样式 | CSSProperties | - |


### Icon.createFromIconfontCN(options)

使用方式如下：

```js
const MyIcon = Icon.createFromIconfontCN({});

// after importing SVG symbols
ReactDOM.render(<MyIcon type="example" />, mountedNode);
```

其本质上是创建了一个使用 `<use>` 标签来渲染图标的组件。

`options` 的配置项如下：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| prefix | 设置图标的前缀，通常以短横线结尾，如 `icon-`、`foo-` | string | '' |
| extraCommonProps | 给所有的 `svg` 图标设置额外的属性 | `{ [key: string]: any }` | {} |
| namespace | 图标集合的名字空间，在 `cdnUrl` 也设置的情况下有效，用于区分已导入的图标符号集合 | string | - |
| cdnUrl | [iconfont.cn](http://iconfont.cn/) 项目在线生成的 `js` 地址，在 `namespace` 也设置的情况下有效 | string | - |

在 `namespace` 和 `cdnUrl` 都设置有效的情况下，组件在渲染前会自动引入 [iconfont.cn](http://iconfont.cn/) 项目中的图标符号集，无需手动引入。

见 [iconfont.cn 使用帮助](http://iconfont.cn/help/detail?spm=a313x.7781069.1998910419.15&helptype=code) 查看如何生成 `js` 地址。
