---
category: Components
subtitle: 图标
type: 通用
title: Icon
toc: false
---

语义化的矢量图形。

## 设计师专属

安装 [Kitchen Sketch 插件 💎](https://kitchen.alipay.com)，就可以一键拖拽使用 Ant Design 和 Iconfont 的海量图标，还可以关联自有项目。

## 图标列表

```__react
import IconDisplay from 'site/theme/template/IconDisplay';
ReactDOM.render(<IconDisplay />, mountNode);
```

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| type | 图标类型。遵循图标的命名规范 | string | - |  |
| style | 设置图标的样式，例如 `fontSize` 和 `color` | CSSProperties | - |  |
| theme | 图标主题风格。可选实心、描线、双色等主题风格，适用于官方图标 | 'filled' \| 'outlined' \| 'twoTone' | 'outlined' | 3.9.0 |
| spin | 是否有旋转动画 | boolean | false |  |
| rotate | 图标旋转角度（3.13.0 后新增，IE9 无效） | number | - | 3.13.0 |
| component | 控制如何渲染图标，通常是一个渲染根标签为 `<svg>` 的 `React` 组件，**会使 `type` 属性失效** | ComponentType<CustomIconComponentProps\> | - | 3.9.0 |
| twoToneColor | 仅适用双色图标。设置双色图标的主要颜色 | string (十六进制颜色) | - | 3.9.0 |

### SVG 图标

在 `3.9.0` 之后，我们使用了 SVG 图标替换了原先的 font 图标，从而带来了以下优势：

- 完全离线化使用，不需要从 CDN 下载字体文件，图标不会因为网络问题呈现方块，也无需字体文件本地部署。
- 在低端设备上 SVG 有更好的清晰度。
- 支持多色图标。
- 对于内建图标的更换可以提供更多 API，而不需要进行样式覆盖。

更多讨论可参考：[#10353](https://github.com/ant-design/ant-design/issues/10353)。

> ⚠️ 3.9.0 之后我们全量引入了所有图标，导致 antd 默认的包体积有一定增加，我们会在不远的未来增加新的 API 来实现图标的按需使用，更多相关讨论可关注：[#12011](https://github.com/ant-design/ant-design/issues/12011)。
>
> 在此之前，你可以通过来自社区同学的 [webpack 插件](https://github.com/Beven91/webpack-ant-icon-loader)将图标文件拆分。

其中 `theme`, `component`, `twoToneColor` 是 `3.9.x` 版本新增加的属性。最佳实践是给使用的 `<Icon />` 组件传入属性 `theme` 以明确图标的主题风格。例如：

```jsx
<Icon type="star" theme="filled" />
```

所有的图标都会以 `<svg>` 标签渲染，可以使用 `style` 和 `className` 设置图标的大小和单色图标的颜色。例如：

```jsx
<Icon type="message" style={{ fontSize: '16px', color: '#08c' }} />
```

### 双色图标主色

对于双色图标，可以通过使用 `Icon.getTwoToneColor()` 和 `Icon.setTwoToneColor(colorString)` 来全局设置图标主色。

```jsx
Icon.setTwoToneColor('#eb2f96');
Icon.getTwoToneColor(); // #eb2f96
```

### 自定义 font 图标

在 `3.9.0` 之后，我们提供了一个 `createFromIconfontCN` 方法，方便开发者调用在 [iconfont.cn](http://iconfont.cn/) 上自行管理的图标。

```js
const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js', // 在 iconfont.cn 上生成
});

ReactDOM.render(<MyIcon type="icon-example" />, mountedNode);
```

其本质上是创建了一个使用 `<use>` 标签来渲染图标的组件。

`options` 的配置项如下：

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| scriptUrl | [iconfont.cn](http://iconfont.cn/) 项目在线生成的 `js` 地址 | string | - | 3.9.3 |
| extraCommonProps | 给所有的 `svg` 图标 `<Icon />` 组件设置额外的属性 | `{ [key: string]: any }` | {} | 3.9.3 |

在 `scriptUrl` 都设置有效的情况下，组件在渲染前会自动引入 [iconfont.cn](http://iconfont.cn/) 项目中的图标符号集，无需手动引入。

见 [iconfont.cn 使用帮助](http://iconfont.cn/help/detail?spm=a313x.7781069.1998910419.15&helptype=code) 查看如何生成 `js` 地址。

### 自定义 SVG 图标

如果使用 `webpack`，可以通过配置 [@svgr/webpack](https://www.npmjs.com/package/@svgr/webpack) 来将 `svg` 图标作为 `React` 组件导入。`@svgr/webpack` 的 `options` 选项请参阅 [svgr 文档](https://github.com/smooth-code/svgr#options)。

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

```jsx
import { Icon } from 'antd';
import MessageSvg from 'path/to/message.svg'; // path to your '*.svg' file.

ReactDOM.render(<Icon component={MessageSvg} />, mountNode);
```

`Icon` 中的 `component` 组件的接受的属性如下：

| 字段      | 说明                    | 类型             | 只读值         | 版本   |
| --------- | ----------------------- | ---------------- | -------------- | ------ |
| width     | `svg` 元素宽度          | string \| number | '1em'          | 3.10.0 |
| height    | `svg` 元素高度          | string \| number | '1em'          | 3.10.0 |
| fill      | `svg` 元素填充的颜色    | string           | 'currentColor' | 3.10.0 |
| className | 计算后的 `svg` 类名     | string           | -              | 3.10.0 |
| style     | 计算后的 `svg` 元素样式 | CSSProperties    | -              | 3.10.0 |
