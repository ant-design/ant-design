---
order: 7
title: Customize Theme
---

Ant Design allows you to customize our design tokens to satisfy UI diversity from business or brand requirements, including primary color, border radius, border color, etc.

In version 5.0, we provide a new way to customize themes. Different from the less and CSS variables of the 4.x version, with CSS-in-JS, the ability of theming has also been enhanced, including but not limited to:

1. Switching theme dynamically；
2. Multiple themes；
3. Customizing theme variables for some component；
4. ...

## Customize theme with `ConfigProvider`

In version 5.0 we call the smallest element that affects the theme **Design Token**. By modifying the Design Token, we can present various themes or components.

### Customize Design Token

You can pass `theme` to ConfigProvider to customize theme. After migrate to V5, theme of V5 will be applied by default. Here's a simple example:

```tsx
import React from 'react';
import { ConfigProvider, Button } from 'antd';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#00b96b',
      },
    }}
  >
    <Button />
  </ConfigProvider>
);

export default App;
```

You will get a theme with primary color <div style="display: inline-block; width: 16px; height: 16px; border-radius: 4px; background: #00b96b; vertical-align: text-bottom;"></div> `#00b96b`. And we can see the change in Button:

![themed button](https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*CbF_RJfKEiwAAAAAAAAAAAAAARQnAQ)

### Customize Component Token

In addition to Design Token, each component will also have its own Component Token to achieve style customization capabilities for components, and different components will not affect each other. Similarly, other Design Token of components can also be overridden in this way.

```tsx
import React from 'react';
import { ConfigProvider, Radio, Checkbox } from 'antd';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      components: {
        Radio: {
          colorPrimary: '#00b96b',
        },
      },
    }}
  >
    <Radio>Radio</Radio>
    <Checkbox>Checkbox</Checkbox>
  </ConfigProvider>
);

export default App;
```

In this way, we changed the primary color of Radio to <div style="display: inline-block; width: 16px; height: 16px; border-radius: 4px; background: #00b96b; vertical-align: text-bottom;"></div> `#00b96b`, and Checkbox is not affected.

![component token](https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*EMY0QrHFDjsAAAAAAAAAAAAAARQnAQ)

## Other Ways to Use Dynamic Themes

### Switch Themes Dynamically

In v5, dynamically switching themes is very simple for users, you can dynamically switch themes at any time through the `theme` property of `ConfigProvider` without any additional configuration.

### Local Theme

By nesting `ConfigProvider` you can apply local theme to some parts of your page. Design Tokens that have not been changed in the child theme will inherit the parent theme.

```tsx
import React from 'react';
import { ConfigProvider, Button } from 'antd';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#1677ff',
      },
    }}
  >
    <Button />
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
        },
      }}
    >
      <Button />
    </ConfigProvider>
  </ConfigProvider>
);

export default App;
```

### Consume Design Token

If you want to consume the Design Token under the current theme, we provide `useToken` hook to get Design Token.

```tsx
import React from 'react';
import { Button, theme } from 'antd';

const { useToken } = theme;

const App: React.FC = () => {
  const { token } = useToken();

  return <Button style={{ backgroundColor: token.colorPrimary }}>Button</Button>;
};

export default App;
```

## Advanced

In Design Token, we provide a three-layer structure that is more suitable for the design, and disassemble the Design Token into three parts: Seed Token, Map Token and Alias Token. These three groups of Tokens are not simple groupings, but a three-layer derivation relationship. Map Tokens are derived from Seed Tokens, and Alias Tokens are derived from Map Tokens. In most cases, using Seed Tokens is sufficient for custom themes. But if you need a higher degree of theme customization, you need to understand the life cycle of Design Token in antd.

### Life Cycle of Design Token

![token](https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*uF3kTrY4InUAAAAAAAAAAAAAARQnAQ)

### Seed Token

Seed Token means the origin of all design intent. For example, we can change the theme color by changing `colorPrimary`, and the algorithm inside antd will automatically calculate and apply a series of corresponding colors according to the Seed Token:

```tsx
const theme = {
  token: {
    colorPrimary: '#1890ff',
  },
};
```

### Map Token

Map Token is a gradient variable derived from Seed. It is recommended to implement custom Map Token through `theme.algorithm`, which can ensure the gradient relationship between Map Tokens. It can also be overridden by `theme.token` to modify the value of some map tokens individually.

```tsx
const theme = {
  token: {
    colorPrimaryBg: '#e6f7ff',
  },
};
```

### Alias Token

Alias Token is used to control the style of some common components in batches, which is basically a Map Token alias, or a specially processed Map Token.

```tsx
const theme = {
  token: {
    colorLink: '#1890ff',
  },
};
```

### Algorithm

The basic algorithm is used to expand the Seed Token into a Map Token, such as calculating a gradient color palette from a basic color, or calculating rounded corners of various sizes from a basic rounded corner. In v5, we provide three algorithms by default, namely the default algorithm (defaultAlgorithm), the dark algorithm (darkAlgorithm) and the compact algorithm (compactAlgorithm). Algorithms can be used in any combination, for example, dark and compact algorithms can be combined to get a dark and compact theme.

```tsx
import { theme } from 'antd';

const { darkAlgorithm, compactAlgorithm } = theme;

const theme = {
  algorithm: [darkAlgorithm, compactAlgorithm],
};
```

## API

### Theme

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| token | Modify Design Token | `AliasToken` | - |
| seperated | Ignore theme configured in upper ConfigProvider | boolean | - |
| algorithm | Modify the algorithms of theme | `(token: SeedToken) => MapToken` \| `((token: SeedToken) => MapToken)[]` | `defaultAlgorithm` |
| components | Modify Component Token and Alias Token applied to components | OverrideToken | - |

### OverrideToken

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `Component` (可以是任意 antd 组件名，如 `Button`) | 用于修改 Component Token 以及覆盖该组件消费的 Alias Token | `ComponentToken & AliasToken` | - |

### SeedToken

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colorPrimary | 品牌主色 | `string` | `#1677ff` |
| colorSuccess | 成功色 | `string` | `#52c41a` |
| colorWarning | 警戒色 | `string` | `#faad14` |
| colorError | 错误色 | `string` | `#f5222d` |
| colorInfo | 信息色 | `string` | `#1677ff` |
| colorTextBase | 基础文本色 | `string` | `#000` |
| colorTextLightSolid | 亮色文本色 | `string` | `#fff` |
| colorBgBase | 基础背景色 | `string` | `#fff` |
| fontFamily | 字体 | `string` | `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'` |
| fontSizeBase | 基础字号 | `number` | `14` |
| gridUnit | - | `number` | `4` |
| gridBaseStep | - | `number` | `2` |
| lineWidth | 基础线宽 | `number` | `1` |
| lineType | 线条样式 | `string` | `solid` |
| motionUnit | 动画时长变化单位 | `number` | `0.1` |
| motionBase | 动画基础时长 | `number` | `0` |
| motionEaseOutCirc | - | `string` | `cubic-bezier(0.08, 0.82, 0.17, 1)` |
| motionEaseInOutCirc | - | `string` | `cubic-bezier(0.78, 0.14, 0.15, 0.86)` |
| motionEaseOut | - | `string` | `cubic-bezier(0.215, 0.61, 0.355, 1)` |
| motionEaseInOut | - | `string` | `cubic-bezier(0.645, 0.045, 0.355, 1)` |
| motionEaseOutBack | - | `string` | `cubic-bezier(0.12, 0.4, 0.29, 1.46)` |
| motionEaseInQuint | - | `string` | `cubic-bezier(0.645, 0.045, 0.355, 1)` |
| motionEaseOutQuint | - | `string` | `cubic-bezier(0.23, 1, 0.32, 1)` |
| radiusBase | 基础圆角 | `number` | `6` |
| sizeUnit | 尺寸变化单位 | `number` | `4` |
| sizeBaseStep | 尺寸基础大小 | `number` | `4` |
| sizePopupArrow | 组件箭头尺寸 | `number` | `16` |
| controlHeight | - | `number` | `32` |
| zIndexBase | 基础 `z-index` | `number` | `0` |
| zIndexPopupBase | 浮层基础 `z-index` | `number` | `1000` |
| opacityImage | - | `number` | `1` |
| wireframe | 线框化 | `boolean` | `false` |

### MapToken

> 继承所有 SeedToken 的属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colorText | 一级文本色 | `string` | `rgba(0, 0, 0, 0.88)` |
| colorTextSecondary | 二级文本色 | `string` | `rgba(0, 0, 0, 0.65)` |
| colorTextTertiary | 三级文本色 | `string` | `rgba(0, 0, 0, 0.45)` |
| colorTextQuaternary | 四级文本色 | `string` | `rgba(0, 0, 0, 0.25)` |
| colorFill | 一级填充色 | `string` | `rgba(0, 0, 0, 0.15)` |
| colorFillSecondary | 二级填充色 | `string` | `rgba(0, 0, 0, 0.06)` |
| colorFillTertiary | 三级填充色 | `string` | `rgba(0, 0, 0, 0.04)` |
| colorFillQuaternary | 四级填充色 | `string` | `rgba(0, 0, 0, 0.02)` |
| colorBgContainer | 组件容器背景色 | `string` | `#ffffff` |
| colorBgElevated | 浮层容器背景色 | `string` | `#ffffff` |
| colorBgLayout | 布局背景色 | `string` | `#f5f5f5` |
| colorBgSpotlight | - | `string` | `rgba(0, 0, 0, 0.85)` |
| colorBorder | 一级边框色 | `string` | `#d9d9d9` |
| colorBorderSecondary | 二级边框色 | `string` | `#f0f0f0` |
| colorSplit | 分割线颜色 | `string` | `rgba(0, 0, 0, 0.06)` |
| colorPrimaryBg | 主色的浅色背景颜色 | `string` | `#e6f4ff` |
| colorPrimaryBgHover | 主色的浅色背景色悬浮态 | `string` | `#bae0ff` |
| colorPrimaryBorder | 主色的描边色 | `string` | `#91caff` |
| colorPrimaryBorderHover | 主色的描边色悬浮态 | `string` | `#69b1ff` |
| colorPrimaryHover | 主色的深色悬浮态 | `string` | `#4096ff` |
| colorPrimary | 品牌主色 | `string` | `#1677ff` |
| colorPrimaryActive | 主色的深色激活态 | `string` | `#0958d9` |
| colorPrimaryTextHover | 主色的文本悬浮态 | `string` | `#4096ff` |
| colorPrimaryText | 主色的文本默认态 | `string` | `#1677ff` |
| colorPrimaryTextActive | 主色的文本激活态 | `string` | `#0958d9` |
| colorSuccessBg | 成功色的浅色背景颜色 | `string` | `#f6ffed` |
| colorSuccessBgHover | 成功色的浅色背景色悬浮态 | `string` | `#d9f7be` |
| colorSuccessBorder | 成功色的描边色 | `string` | `#b7eb8f` |
| colorSuccessBorderHover | 成功色的描边色悬浮态 | `string` | `#95de64` |
| colorSuccessHover | 成功色的深色悬浮态 | `string` | `#95de64` |
| colorSuccess | 成功色 | `string` | `#52c41a` |
| colorSuccessActive | 成功色的深色激活态 | `string` | `#389e0d` |
| colorSuccessTextHover | 成功色的文本悬浮态 | `string` | `#73d13d` |
| colorSuccessText | 成功色的文本默认态 | `string` | `#52c41a` |
| colorSuccessTextActive | 成功色的文本激活态 | `string` | `#389e0d` |
| colorWarningBg | 警戒色的浅色背景颜色 | `string` | `#fffbe6` |
| colorWarningBgHover | 警戒色的浅色背景色悬浮态 | `string` | `#fff1b8` |
| colorWarningBorder | 警戒色的描边色 | `string` | `#ffe58f` |
| colorWarningBorderHover | 警戒色的描边色悬浮态 | `string` | `#ffd666` |
| colorWarningHover | 警戒色的深色悬浮态 | `string` | `#ffd666` |
| colorWarning | 警戒色 | `string` | `#faad14` |
| colorWarningActive | 警戒色的深色激活态 | `string` | `#d48806` |
| colorWarningTextHover | 警戒色的文本悬浮态 | `string` | `#ffc53d` |
| colorWarningText | 警戒色的文本默认态 | `string` | `#faad14` |
| colorWarningTextActive | 警戒色的文本激活态 | `string` | `#d48806` |
| colorErrorBg | 错误色的浅色背景颜色 | `string` | `#fff1f0` |
| colorErrorBgHover | 错误色的浅色背景色悬浮态 | `string` | `#ffccc7` |
| colorErrorBorder | 错误色的描边色 | `string` | `#ffa39e` |
| colorErrorBorderHover | 错误色的描边色悬浮态 | `string` | `#ff7875` |
| colorErrorHover | 错误色的深色悬浮态 | `string` | `#ff7875` |
| colorError | 错误色 | `string` | `#ff4d4f` |
| colorErrorActive | 错误色的深色激活态 | `string` | `#cf1322` |
| colorErrorTextHover | 错误色的文本悬浮态 | `string` | `#ff4d4f` |
| colorErrorText | 错误色的文本默认态 | `string` | `#f5222d` |
| colorErrorTextActive | 错误色的文本激活态 | `string` | `#cf1322` |
| colorInfoBg | 信息色的浅色背景颜色 | `string` | `#e6f4ff` |
| colorInfoBgHover | 信息色的浅色背景色悬浮态 | `string` | `#bae0ff` |
| colorInfoBorder | 信息色的描边色 | `string` | `#91caff` |
| colorInfoBorderHover | 信息色的描边色悬浮态 | `string` | `#69b1ff` |
| colorInfoHover | 信息色的深色悬浮态 | `string` | `#69b1ff` |
| colorInfo | 信息色 | `string` | `#e6f4ff` |
| colorInfoActive | 信息色的深色激活态 | `string` | `#0958d9` |
| colorInfoTextHover | 信息色的文本悬浮态 | `string` | `#4096ff` |
| colorInfoText | 信息色的文本默认态 | `string` | `#1677ff` |
| colorInfoTextActive | 信息色的文本激活态 | `string` | `#0958d9` |
| colorBgMask | 浮层的背景蒙层颜色 | `string` | `rgba(0, 0, 0, 0.45)` |
| sizeSpace | - | `number` | `12` |
| sizeSpaceSM | - | `number` | `16` |
| sizeSpaceXS | - | `number` | `8` |
| sizeSpaceXXS | - | `number` | `4` |
| gridSpaceSM | - | `number` | `4` |
| gridSpaceBase | - | `number` | `8` |
| gridSpaceLG | - | `number` | `12` |
| gridSpaceXL | - | `number` | `16` |
| gridSpaceXXL | - | `number` | `28` |
| lineWidthBold | 较粗的线宽 | `number` | `2` |
| motionDurationFast | 动画速度快 | `string` | `0.1s` |
| motionDurationMid | 动画速度中等 | `string` | `0.2s` |
| motionDurationSlow | 动画速度慢 | `string` | `0.3s` |
| radiusXS | 更小的圆角 | `number` | `2` |
| radiusSM | 较小的圆角 | `number` | `4` |
| radiusLG | 较大的圆角 | `number` | `8` |
| radiusOuter | 向外的圆角（常用于箭头与其他元素相接处） | `number` | `4` |
| controlHeightXS | - | `number` | `24` |
| controlHeightSM | - | `number` | `16` |
| controlHeightLG | - | `number` | `40` |

### AliasToken

> 继承所有 SeedToken 和 MapToken 的属性

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colorFillContent | - | `string` | `rgba(0, 0, 0, 0.06)` |
| colorFillContentHover | - | `string` | `rgba(0, 0, 0, 0.12)` |
| colorFillAlter | - | `string` | `rgba(0, 0, 0, 0.02)` |
| colorBgContainerDisabled | - | `string` | `rgba(0, 0, 0, 0.04)` |
| colorBorderBg | - | `string` | `#ffffff` |
| colorSplit | - | `string` | `rgba(0, 0, 0, 0.06)` |
| colorTextPlaceholder | - | `string` | `rgba(0, 0, 0, 0.25)` |
| colorTextDisabled | - | `string` | `rgba(0, 0, 0, 0.25)` |
| colorTextHeading | - | `string` | `rgba(0, 0, 0, 0.85)` |
| colorTextLabel | - | `string` | `rgba(0, 0, 0, 0.65)` |
| colorTextDescription | - | `string` | `rgba(0, 0, 0, 0.45)` |
| colorBgTextHover | - | `string` | `rgba(0, 0, 0, 0.06)` |
| colorBgTextActive | - | `string` | `rgba(0, 0, 0, 0.15)` |
| colorIcon | - | `string` | `rgba(0, 0, 0, 0.45)` |
| colorIconHover | - | `string` | `rgba(0, 0, 0, 0.88)` |
| colorLink | - | `string` | `#1677ff` |
| colorLinkHover | - | `string` | `#69b1ff` |
| colorLinkActive | - | `string` | `#0958d9` |
| colorHighlight | - | `string` | `#ff4d4f` |
| controlOutline | - | `string` | `rgba(5, 145, 255, 0.1)` |
| colorWarningOutline | - | `string` | `rgba(255, 215, 5, 0.1)` |
| colorErrorOutline | - | `string` | `rgba(255, 22, 5, 0.06)` |
| fontSizeSM | - | `number` | `12` |
| fontSize | - | `number` | `14` |
| fontSizeLG | - | `number` | `16` |
| fontSizeXL | - | `number` | `20` |
| fontSizeIcon | - | `number` | `12` |
| fontSizeHeading1 | - | `number` | `38` |
| fontSizeHeading2 | - | `number` | `30` |
| fontSizeHeading3 | - | `number` | `24` |
| fontSizeHeading4 | - | `number` | `20` |
| fontSizeHeading5 | - | `number` | `16` |
| fontWeightStrong | - | `number` | `600` |
| lineHeight | - | `number` | `1.5714` |
| lineHeightLG | - | `number` | `1.5` |
| lineHeightSM | - | `number` | `1.6667` |
| lineHeightHeading1 | - | `number` | `1.2105` |
| lineHeightHeading2 | - | `number` | `1.2667` |
| lineHeightHeading3 | - | `number` | `1.3333` |
| lineHeightHeading4 | - | `number` | `1.4` |
| lineHeightHeading5 | - | `number` | `1.5` |
| controlLineWidth | - | `number` | `1` |
| controlLineType | - | `string` | `solid` |
| controlRadius | - | `number` | `6` |
| controlRadiusXS | - | `number` | `2` |
| controlRadiusSM | - | `number` | `4` |
| controlRadiusLG | - | `number` | `8` |
| controlOutlineWidth | - | `number` | `8` |
| controlItemBgHover | - | `string` | `rgba(0, 0, 0, 0.04)` |
| controlItemBgActive | - | `string` | `#e6f4ff` |
| controlItemBgActiveHover | - | `string` | `#bae0ff` |
| controlInteractiveSize | - | `number` | `16` |
| controlItemBgActiveDisabled | - | `string` | `rgba(0, 0, 0, 0.15)` |
| controlTmpOutline | - | `string` | `rgba(0, 0, 0, 0.02)` |
| opacityLoading | - | `number` | `0.65` |
| padding | - | `number` | `16` |
| paddingSM | - | `number` | `12` |
| paddingXS | - | `number` | `8` |
| paddingXXS | - | `number` | `4` |
| paddingLG | - | `number` | `24` |
| paddingXL | - | `number` | `32` |
| paddingTmp | - | `number` | `20` |
| margin | - | `number` | `16` |
| marginSM | - | `number` | `12` |
| marginXS | - | `number` | `8` |
| marginXXS | - | `number` | `4` |
| marginLG | - | `number` | `24` |
| marginXL | - | `number` | `32` |
| marginXXL | - | `number` | `48` |
| boxShadow | - | `string` | `0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)` |
| boxShadowSecondary | - | `string` | `0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)` |
| linkDecoration | - | `React.CSSProperties['textDecoration']` | `none` |
| linkHoverDecoration | - | `React.CSSProperties['textDecoration']` | `none` |
| linkFocusDecoration | - | `React.CSSProperties['textDecoration']` | `none` |
| controlPaddingHorizontal | - | `number` | `12` |
| controlPaddingHorizontalSM | - | `number` | `8` |
| screenXS | - | `number` | `480` |
| screenXSMin | - | `number` | `480` |
| screenXSMax | - | `number` | `479` |
| screenSM | - | `number` | `576` |
| screenSMMin | - | `number` | `576` |
| screenSMMax | - | `number` | `575` |
| screenMD | - | `number` | `768` |
| screenMDMin | - | `number` | `768` |
| screenMDMax | - | `number` | `767` |
| screenLG | - | `number` | `992` |
| screenLGMin | - | `number` | `992` |
| screenLGMax | - | `number` | `991` |
| screenXL | - | `number` | `1200` |
| screenXLMin | - | `number` | `1200` |
| screenXLMax | - | `number` | `1199` |
| screenXXL | - | `number` | `1600` |
| screenXXLMin | - | `number` | `1599` |
| screenXXLMax | - | `number` | `1600` |

## How to Debug your Theme

We provide tools to help users debug themes: [Theme Editor](https://ant-design.github.io/antd-token-previewer/~demos/docs-theme-editor-simple)

You can use this tool to freely modify Design Token to meet your theme expectations.

## Theme Presets

- [Ant Design 4.x](https://ant-design.github.io/antd-token-previewer/~demos/docs-v4-theme)

## FAQ

### Why component re-mounted when `theme` changed from `undefined` to some object or to `undefined`?

In ConfigProvider, we pass context through `DesignTokenContext`. When `theme` is `undefined`, a layer of Provider will not be set, so React VirtualDOM structure changes from scratch or from existence to nothing, causing components to be re-mounted. Solution: Replace `undefined` with an empty object `{}`.
