---
order: 7
title: 5.0 定制主题
---

Ant Design 设计规范和技术上支持灵活的样式定制，以满足业务和品牌上多样化的视觉需求，包括但不限于全局样式（主色、圆角、边框）和指定组件的视觉定制。

在 5.0 版本的 Ant Design 中，我们提供了一套全新的定制主题方案。不同于 4.x 版本的 less 和 CSS 变量，有了 CSS-in-JS 的加持后，动态主题的能力也得到了加强，包括但不限于：

1. 支持动态切换主题；
2. 支持同时存在多个主题；
3. 支持针对某个/某些组件主题变量；
4. ...

> TODO: 这里需要一张 GIF 展示动态主题能力

## Design Token

在正式介绍 5.0 定制主题的方案之前，我们需要对主题的组成部分有一个基本的了解。

与 4.x 版本相同的是，5.0 也提供了一批变量用于更改主题的各项参数。 在 4.x 中我们使用了 less 变量来实现定制主题的能力；而在 5.0 的 CSS-in-JS 方案中，我们使用 JS 变量作为动态主题的基础，这些变量我们统称为 **Design Token**。

### 基本组成

用过 4.x 定制主题的同学应该知道，在 4.x 中所有的 less 变量都是平铺的，`default.less` 这个文件就长达 1000+ 行。在 Design Token 中我们对原有的变量进行了精简，并且在设计师的引导下产出了一套更加贴合设计的三层结构，将 Design Token 拆解为 **Seed Token**、**Map Token** 和 **Alias Token** 三部分。

这三组 Token 并不是简单的分组，而是一个三层的派生关系，由 Seed Token 派生 Map Token，再由 Map Token 派生 Alias Token。这中间经历的过程实际上也是设计到代码的过程，Seed Token 和 Map Token 主要是由设计师产出并展开，命名逻辑会更偏向设计；到了 Alias Token 实际上已经是 Token 投入到代码中使用的环节，所以命名逻辑会逐渐偏向使用侧。

设计师对于这三种 Token 的定义是这样的：

- **Seed Token**：基础变量基础变量（Seed Token）意味着所有设计意图的起源。在 Ant Design 中，我们会基于 Seed Token 自动派生一套具有设计语义的梯度变量（Map Token）
- **Map Token**：梯度变量梯度变量（Map Token） 是基于 Seed 派生的梯度变量，我们精心设计的梯度变量模型具有良好的设计语义，可保证在亮暗色模式切换时保证视觉梯度的一致性。
- **Alias Token**：别名变量别名变量（Alias Token）是 Map Token 的别名。Alias Token 用于批量控制某些共性组件的样式。

### 基本算法

> TODO

### 演变过程

> TODO

### Component Token

除了整体的 Token 链路之外，各个组件也会开放自己的 Component Token 来实现针对组件的样式定制能力，不同的组件之间不会相互影响。一般来说会是一些具体场景下的 CSS 变量，我们会单独提出来作为 Component Token。

> TODO: 需要对各个组件补充 Component Token 的说明，这里可以链接到某个组件的页面

## 在代码中定制主题

### 使用 ConfigProvider

我们为 ConfigProvider 添加了 `theme` 属性，用于传递主题配置，你可以在这里任意修改在上文中提到的 Design Token 和 Component Token。

```tsx
import { ConfigProvider, Button } from 'antd';

export default () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#1890ff',
        radiusBase: 2,
      },
    }}
  >
    <Button />
  </ConfigProvider>
);
```

### 局部主题

> TODO

### 在 umi 4 中定制主题

> TODO

### API (暂定)

#### Theme

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| token | `AliasToken` | - | 用于修改 Design Token |
| algorithm | `(token: SeedToken) => MapToken` \| `((token: SeedToken) => MapToken)[]` | `defaultAlgorithm` | 用于修改 Seed Token 到 Map Token 的算法 |
| components | OverrideToken | - | 用于修改各个组件的 Component Token 以及覆盖该组件消费的 Alias Token |

#### OverrideToken

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `Component` (可以是任意 antd 组件名，如 `Button`) | `ComponentToken & AliasToken` | - | 用于修改 Component Token 以及覆盖该组件消费的 Alias Token |

#### SeedToken

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| colorPrimary | `string` | `#1677ff` | 品牌主色 |
| colorSuccess | `string` | `#52c41a` | 成功色 |
| colorWarning | `string` | `#faad14` | 警戒色 |
| colorError | `string` | `#f5222d` | 错误色 |
| colorInfo | `string` | `#1677ff` | 信息色 |
| colorTextBase | `string` | `#000` | 基础文本色 |
| colorTextLightSolid | `string` | `#fff` | 亮色文本色 |
| colorBgBase | `string` | `#fff` | 基础背景色 |
| fontFamily | `string` | `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'` | 字体 |
| fontSizeBase | `number` | `14` | 基础字号 |
| gridUnit | `number` | `4` | - |
| gridBaseStep | `number` | `2` | - |
| lineWidth | `number` | `1` | 基础线宽 |
| lineType | `string` | `solid` | 线条样式 |
| motionUnit | `number` | `0.1` | 动画时长变化单位 |
| motionBase | `number` | `0` | 动画基础时长 |
| motionEaseOutCirc | `string` | `cubic-bezier(0.08, 0.82, 0.17, 1)` | - |
| motionEaseInOutCirc | `string` | `cubic-bezier(0.78, 0.14, 0.15, 0.86)` | - |
| motionEaseOut | `string` | `cubic-bezier(0.215, 0.61, 0.355, 1)` | - |
| motionEaseInOut | `string` | `cubic-bezier(0.645, 0.045, 0.355, 1)` | - |
| motionEaseOutBack | `string` | `cubic-bezier(0.12, 0.4, 0.29, 1.46)` | - |
| motionEaseInQuint | `string` | `cubic-bezier(0.645, 0.045, 0.355, 1)` | - |
| motionEaseOutQuint | `string` | `cubic-bezier(0.23, 1, 0.32, 1)` | - |
| radiusBase | `number` | `6` | 基础圆角 |
| sizeUnit | `number` | `4` | 尺寸变化单位 |
| sizeBaseStep | `number` | `4` | 尺寸基础大小 |
| sizePopupArrow | `number` | `16` | 组件箭头尺寸 |
| controlHeight | `number` | `32` | - |
| zIndexBase | `number` | `0` | 基础 `z-index` |
| zIndexPopupBase | `number` | `1000` | 浮层基础 `z-index` |
| opacityImage | `number` | `1` | - |
| wireframe | `boolean` | `false` | 线框化 |

#### MapToken

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| colorText | `string` | `rgba(0, 0, 0, 0.88)` | 一级文本色 |
| colorTextSecondary | `string` | `rgba(0, 0, 0, 0.65)` | 二级文本色 |
| colorTextTertiary | `string` | `rgba(0, 0, 0, 0.45)` | 三级文本色 |
| colorTextQuaternary | `string` | `rgba(0, 0, 0, 0.25)` | 四级文本色 |
| colorFill | `string` | `rgba(0, 0, 0, 0.15)` | 一级填充色 |
| colorFillSecondary | `string` | `rgba(0, 0, 0, 0.06)` | 二级填充色 |
| colorFillTertiary | `string` | `rgba(0, 0, 0, 0.04)` | 三级填充色 |
| colorFillQuaternary | `string` | `rgba(0, 0, 0, 0.02)` | 四级填充色 |
| colorBgContainer | `string` | `#ffffff` | 组件容器背景色 |
| colorBgElevated | `string` | `#ffffff` | 浮层容器背景色 |
| colorBgLayout | `string` | `#f5f5f5` | 布局背景色 |
| colorBgSpotlight | `string` | `rgba(0, 0, 0, 0.85)` | - |
| colorBorder | `string` | `#d9d9d9` | 一级边框色 |
| colorBorderSecondary | `string` | `#f0f0f0` | 二级边框色 |
| colorSplit | `string` | `rgba(0, 0, 0, 0.06)` | 分割线颜色 |
| colorPrimaryBg | `string` | `#e6f4ff` | 主色的浅色背景颜色 |
| colorPrimaryBgHover | `string` | `#bae0ff` | 主色的浅色背景色悬浮态 |
| colorPrimaryBorder | `string` | `#91caff` | 主色的描边色 |
| colorPrimaryBorderHover | `string` | `#69b1ff` | 主色的描边色悬浮态 |
| colorPrimaryHover | `string` | `#4096ff` | 主色的深色悬浮态 |
| colorPrimary | `string` | `#1677ff` | 品牌主色 |
| colorPrimaryActive | `string` | `#0958d9` | 主色的深色激活态 |
| colorPrimaryTextHover | `string` | `#4096ff` | 主色的文本悬浮态 |
| colorPrimaryText | `string` | `#1677ff` | 主色的文本默认态 |
| colorPrimaryTextActive | `string` | `#0958d9` | 主色的文本激活态 |
| colorSuccessBg | `string` | `#f6ffed` | 成功色的浅色背景颜色 |
| colorSuccessBgHover | `string` | `#d9f7be` | 成功色的浅色背景色悬浮态 |
| colorSuccessBorder | `string` | `#b7eb8f` | 成功色的描边色 |
| colorSuccessBorderHover | `string` | `#95de64` | 成功色的描边色悬浮态 |
| colorSuccessHover | `string` | `#95de64` | 成功色的深色悬浮态 |
| colorSuccess | `string` | `#52c41a` | 成功色 |
| colorSuccessActive | `string` | `#389e0d` | 成功色的深色激活态 |
| colorSuccessTextHover | `string` | `#73d13d` | 成功色的文本悬浮态 |
| colorSuccessText | `string` | `#52c41a` | 成功色的文本默认态 |
| colorSuccessTextActive | `string` | `#389e0d` | 成功色的文本激活态 |
| colorWarningBg | `string` | `#fffbe6` | 警戒色的浅色背景颜色 |
| colorWarningBgHover | `string` | `#fff1b8` | 警戒色的浅色背景色悬浮态 |
| colorWarningBorder | `string` | `#ffe58f` | 警戒色的描边色 |
| colorWarningBorderHover | `string` | `#ffd666` | 警戒色的描边色悬浮态 |
| colorWarningHover | `string` | `#ffd666` | 警戒色的深色悬浮态 |
| colorWarning | `string` | `#faad14` | 警戒色 |
| colorWarningActive | `string` | `#d48806` | 警戒色的深色激活态 |
| colorWarningTextHover | `string` | `#ffc53d` | 警戒色的文本悬浮态 |
| colorWarningText | `string` | `#faad14` | 警戒色的文本默认态 |
| colorWarningTextActive | `string` | `#d48806` | 警戒色的文本激活态 |
| colorErrorBg | `string` | `#fff1f0` | 错误色的浅色背景颜色 |
| colorErrorBgHover | `string` | `#ffccc7` | 错误色的浅色背景色悬浮态 |
| colorErrorBorder | `string` | `#ffa39e` | 错误色的描边色 |
| colorErrorBorderHover | `string` | `#ff7875` | 错误色的描边色悬浮态 |
| colorErrorHover | `string` | `#ff7875` | 错误色的深色悬浮态 |
| colorError | `string` | `#ff4d4f` | 错误色 |
| colorErrorActive | `string` | `#cf1322` | 错误色的深色激活态 |
| colorErrorTextHover | `string` | `#ff4d4f` | 错误色的文本悬浮态 |
| colorErrorText | `string` | `#f5222d` | 错误色的文本默认态 |
| colorErrorTextActive | `string` | `#cf1322` | 错误色的文本激活态 |
| colorInfoBg | `string` | `#e6f4ff` | 信息色的浅色背景颜色 |
| colorInfoBgHover | `string` | `#bae0ff` | 信息色的浅色背景色悬浮态 |
| colorInfoBorder | `string` | `#91caff` | 信息色的描边色 |
| colorInfoBorderHover | `string` | `#69b1ff` | 信息色的描边色悬浮态 |
| colorInfoHover | `string` | `#69b1ff` | 信息色的深色悬浮态 |
| colorInfo | `string` | `#e6f4ff` | 信息色 |
| colorInfoActive | `string` | `#0958d9` | 信息色的深色激活态 |
| colorInfoTextHover | `string` | `#4096ff` | 信息色的文本悬浮态 |
| colorInfoText | `string` | `#1677ff` | 信息色的文本默认态 |
| colorInfoTextActive | `string` | `#0958d9` | 信息色的文本激活态 |
| colorBgMask | `string` | `rgba(0, 0, 0, 0.45)` | 浮层的背景蒙层颜色 |
| sizeSpace | `number` | `12` | - |
| sizeSpaceSM | `number` | `16` | - |
| sizeSpaceXS | `number` | `8` | - |
| sizeSpaceXXS | `number` | `4` | - |
| gridSpaceSM | `number` | `4` | - |
| gridSpaceBase | `number` | `8` | - |
| gridSpaceLG | `number` | `12` | - |
| gridSpaceXL | `number` | `16` | - |
| gridSpaceXXL | `number` | `28` | - |
| lineWidthBold | `number` | `2` | 较粗的线宽 |
| motionDurationFast | `string` | `0.1s` | 动画速度快 |
| motionDurationMid | `string` | `0.2s` | 动画速度中等 |
| motionDurationSlow | `string` | `0.3s` | 动画速度慢 |
| radiusXS | `number` | `2` | 更小的圆角 |
| radiusSM | `number` | `4` | 较小的圆角 |
| radiusLG | `number` | `8` | 较大的圆角 |
| radiusOuter | `number` | `4` | 向外的圆角（常用于箭头与其他元素相接处） |
| controlHeightXS | `number` | `24` | - |
| controlHeightSM | `number` | `16` | - |
| controlHeightLG | `number` | `40` | - |

#### AliasToken (待补全)

| 属性                | 类型     | 默认值    | 说明                                     |
| ------------------- | -------- | --------- | ---------------------------------------- |
| controlItemBgActive | `string` | `#e6f4ff` | 用于控件类组件中的单项的激活态选中样式。 |

### 调试主题

我们提供了帮助用户调试主题的工具：[主题编辑器](https://ant-design.github.io/antd-token-previewer/~demos/docs-theme-editor-simple)

你可以使用此工具自由地修改 Design Token，以达到您对主题的期望。

## 主题展示

- [Ant Design 4.x 主题](https://ant-design.github.io/antd-token-previewer/~demos/docs-v4-theme)

> 可以引导用户贡献一些优质主题并收集起来

## FAQ

### 为什么 `theme` 从 `undefined` 变为对象或者变为 `undefined` 时组件重新 mount 了？

在 ConfigProvider 中我们通过 `DesignTokenContext` 传递 context，`theme` 为 `undefined` 时不会套一层 Provider，所以从无到有或者从有到无时 React 的 VirtualDOM 结构变化，导致组件重新 mount。解决方法：将 `undefined` 替换为空对象 `{}` 即可。
