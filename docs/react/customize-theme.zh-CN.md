---
order: 7
title: 定制主题
---

Ant Design 设计规范和技术上支持灵活的样式定制，以满足业务和品牌上多样化的视觉需求，包括但不限于全局样式（主色、圆角、边框）和指定组件的视觉定制。

在 5.0 版本的 Ant Design 中，我们提供了一套全新的定制主题方案。不同于 4.x 版本的 less 和 CSS 变量，有了 CSS-in-JS 的加持后，动态主题的能力也得到了加强，包括但不限于：

1. 支持动态切换主题；
2. 支持同时存在多个主题；
3. 支持针对某个/某些组件修改主题变量；
4. ...

## 在 ConfigProvider 中配置主题

在 5.0 版本中我们把影响主题的最小元素称为 **Design Token**。通过修改 Design Token，我们可以呈现出各种各样的主题或者组件。

### 修改主题变量

通过在 ConfigProvider 中传入 `theme`，可以配置主题。在升级 v5 后，将默认使用 v5 的主题，以下是将配置主题示例：

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

这将会得到一个以 <div style="display: inline-block; width: 16px; height: 16px; border-radius: 4px; background: #00b96b; vertical-align: text-bottom;"></div> `#00b96b` 为主色的主题，以 Button 组件为例可以看到相应的变化：

![themed button](https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*CbF_RJfKEiwAAAAAAAAAAAAAARQnAQ)

### 使用预设算法

通过修改算法可以快速生成风格迥异的主题，5.0 版本中默认提供三套预设算法，分别是默认算法 `theme.defaultAlgorithm`、暗色算法 `theme.darkAlgorithm` 和紧凑算法 `theme.compactAlgorithm`。你可以通过修改 ConfigProvider 中 `theme` 属性的 `algorithm` 属性来切换算法。

```tsx
import React from 'react';
import { ConfigProvider, Button, theme } from 'antd';

const App: React.FC = () => (
  <ConfigProvider
    theme={{
      algorithm: theme.darkAlgorithm,
    }}
  >
    <Button />
  </ConfigProvider>
);

export default App;
```

### 修改组件变量 (Component Token)

除了整体的 Design Token，各个组件也会开放自己的 Component Token 来实现针对组件的样式定制能力，不同的组件之间不会相互影响。同样地，也可以通过这种方式来覆盖组件的其他 Design Token。

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

通过这种方式，我们可以仅将 Radio 组件的主色改为 <div style="display: inline-block; width: 16px; height: 16px; border-radius: 4px; background: #00b96b; vertical-align: text-bottom;"></div> `#00b96b`，而不会影响其他组件。

![component token](https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*EMY0QrHFDjsAAAAAAAAAAAAAARQnAQ)

## 动态主题的其他使用方式

### 动态切换

在 v5 中，动态切换主题对用户来说是非常简单的，你可以在任何时候通过 `ConfigProvider` 的 `theme` 属性来动态切换主题，而不需要任何额外配置。

### 局部主题

可以嵌套使用 `ConfigProvider` 来实现局部主题的更换。在子主题中未被改变的 Design Token 将会继承父主题。

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

### 使用 Design Token

如果你希望使用当前主题下的 Design Token，我们提供了 `useToken` 这个 hook 来获取 Design Token。

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

### 静态消费（如 less）

当你需要非 React 生命周期消费 Token 变量时，可以通过静态方法将其导出：

```jsx
import { theme } from 'antd';

const { defaultAlgorithm, defaultSeed } = theme;

const mapToken = defaultAlgorithm(defaultSeed);
```

如果需要将其应用到静态样式编译框架，如 less 可以通过 less-loader 注入：

```jsx
{
  loader: "less-loader",
  options: {
    lessOptions: {
      modifyVars: mapToken,
    },
  },
}
```

兼容包提供了变量转换方法用于转成 v4 的 less 变量，如需使用[点击此处](/docs/react/migration-v5)查看详情。

## 进阶使用

在 Design Token 中我们提供了一套更加贴合设计的三层结构，将 Design Token 拆解为 Seed Token、Map Token 和 Alias Token 三部分。这三组 Token 并不是简单的分组，而是一个三层的派生关系，由 Seed Token 派生 Map Token，再由 Map Token 派生 Alias Token。在大部分情况下，使用 Seed Token 就可以满足定制主题的需要。但如果您需要更高程度的主题定制，您需要了解 antd 中 Design Token 的生命周期。

### 演变过程

![token](https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*uF3kTrY4InUAAAAAAAAAAAAAARQnAQ)

### 基础变量（Seed Token）

Seed Token 意味着所有设计意图的起源。比如我们可以通过改变 `colorPrimary` 来改变主题色，antd 内部的算法会自动的根据 Seed Token 计算出对应的一系列颜色并应用：

```tsx
const theme = {
  token: {
    colorPrimary: '#1890ff',
  },
};
```

### 梯度变量（Map Token）

Map Token 是基于 Seed 派生的梯度变量。定制 Map Token 推荐通过 `theme.algorithm` 来实现，这样可以保证 Map Token 之间的梯度关系。也可以通过 `theme.token` 覆盖，用于单独修改一些 map token 的值。

```tsx
const theme = {
  token: {
    colorPrimaryBg: '#e6f7ff',
  },
};
```

### 别名变量（Alias Token）

Alias Token 用于批量控制某些共性组件的样式，基本上是 Map Token 别名，或者特殊处理过的 Map Token。

```tsx
const theme = {
  token: {
    colorLink: '#1890ff',
  },
};
```

### 基本算法（algorithm)

基本算法用于将 Seed Token 展开为 Map Token，比如由一个基本色算出一个梯度色板，或者由一个基本的圆角算出各种大小的圆角。算法可以单独使用，也可以任意地组合使用，比如可以将暗色算法和紧凑算法组合使用，得到一个暗色和紧凑相结合的主题。

```tsx
import { theme } from 'antd';

const { darkAlgorithm, compactAlgorithm } = theme;

const theme = {
  algorithm: [darkAlgorithm, compactAlgorithm],
};
```

### 兼容性调整

Ant Design 的 CSS-in-JS 默认通过 `:where` 选择器降低 CSS Selector 优先级，以减少用户升级 v5 时额外调整自定义样式成本。在某些场景下你如果需要支持的旧版浏览器，你可以使用 `@ant-design/cssinjs` 取消默认的降权操作（请注意版本保持与 antd 一致）：

```tsx
import React from 'react';
import { StyleProvider } from '@ant-design/cssinjs';

export default () => (
  <StyleProvider hashPriority="high">
    <MyApp />
  </StyleProvider>
);
```

切换后，样式将从 `:where` 切换为类选择器：

```diff
--  :where(.css-bAMboO).ant-btn {
++  .css-bAMboO.ant-btn {
      color: #fff;
    }
```

注意：关闭 `:where` 降权后，你可能需要手动调整一些样式的优先级。

### 服务端渲染

使用 `@ant-design/cssinjs` 将所需样式抽离：

```tsx
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

export default () => {
  // SSR Render
  const cache = createCache();

  const html = renderToString(
    <StyleProvider cache={cache}>
      <MyApp />
    </StyleProvider>,
  );

  // Grab style from cache
  const styleText = extractStyle(cache);

  // Mix with style
  return `
<!DOCTYPE html>
<html>
  <head>
    ${styleText}
  </head>
  <body>
    <div id="root">${html}</div>
  </body>
</html>
`;
};
```

## API

### Theme

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| token | 用于修改 Design Token | `AliasToken` | - |
| inherit | 继承上层 ConfigProvider 中配置的主题。 | boolean | true |
| algorithm | 用于修改 Seed Token 到 Map Token 的算法 | `(token: SeedToken) => MapToken` \| `((token: SeedToken) => MapToken)[]` | `defaultAlgorithm` |
| components | 用于修改各个组件的 Component Token 以及覆盖该组件消费的 Alias Token | OverrideToken | - |

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

## 调试主题

我们提供了帮助用户调试主题的工具：[主题编辑器](https://ant-design.github.io/antd-token-previewer/~demos/docs-theme-editor-simple)

你可以使用此工具自由地修改 Design Token，以达到您对主题的期望。

## 主题展示

- [Ant Design 4.x 主题](https://ant-design.github.io/antd-token-previewer/~demos/docs-v4-theme)

## FAQ

### 为什么 `theme` 从 `undefined` 变为对象或者变为 `undefined` 时组件重新 mount 了？

在 ConfigProvider 中我们通过 `DesignTokenContext` 传递 context，`theme` 为 `undefined` 时不会套一层 Provider，所以从无到有或者从有到无时 React 的 VirtualDOM 结构变化，导致组件重新 mount。解决方法：将 `undefined` 替换为空对象 `{}` 即可。

<div style="display: none;">
- 在 Umi 4 中定制主题
- 与 V4 定制主题的区别
- less 变量与 Design Token 对照表
</div>
