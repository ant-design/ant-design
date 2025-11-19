---
group:
  title: 进阶使用
order: 1
title: 样式兼容
---

## 默认样式兼容性说明

Ant Design 5.x 支持[最近 2 个版本的现代浏览器](https://browsersl.ist/#q=defaults)。默认情况下，我们使用了一些现代 CSS 特性来提高样式的可维护性和可扩展性，这些特性在旧版浏览器中可能不被支持，好在我们可以通过一些降级兼容方案来解决。

| 特性 | antd 版本 | 兼容性 | 最低 Chrome 版本 | 降级兼容方案 |
| --- | --- | --- | --- | --- |
| [:where 选择器](https://developer.mozilla.org/en-US/docs/Web/CSS/:where) | `>=5.0.0` | [caniuse](https://caniuse.com/?search=%3Awhere) | Chrome 88 | `<StyleProvider hashPriority="high">` |
| [CSS 逻辑属性](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties) | `>=5.0.0` | [caniuse](https://caniuse.com/css-logical-props) | Chrome 89 | `<StyleProvider transformers={[legacyLogicalPropertiesTransformer]}>` |

如果你需要兼容旧版浏览器，请根据实际需求使用 `@ant-design/cssinjs@1.x` 的 [StyleProvider](https://github.com/ant-design/cssinjs#styleprovider) 降级处理。

**🚨 注意：v5 请使用 `@ant-design/cssinjs` 1.x 版本。**

## `:where` 选择器

- 支持版本：`>=5.0.0`
- MDN 文档：[:where](https://developer.mozilla.org/en-US/docs/Web/CSS/:where)
- 浏览器兼容性：[caniuse](https://caniuse.com/?search=%3Awhere)
- Chrome 最低支持版本：88
- 默认启用：是

Ant Design 的 CSS-in-JS 默认通过 `:where` 选择器降低 CSS Selector 优先级，以减少用户升级时额外调整自定义样式的成本，不过 `:where` 语法的[兼容性](https://developer.mozilla.org/en-US/docs/Web/CSS/:where#browser_compatibility)在低版本浏览器比较差。在某些场景下你如果需要支持旧版浏览器，你可以使用 `@ant-design/cssinjs@1.x` 取消默认的降权操作（请注意版本保持与 antd 一致）：

```tsx
import { StyleProvider } from '@ant-design/cssinjs';

// `hashPriority` 默认为 `low`，配置为 `high` 后，
// 会移除 `:where` 选择器封装
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

注意：关闭 `:where` 降权后，你可能需要手动调整一些样式的优先级。亦或者**使用 PostCSS 插件**提升应用样式的优先级，PostCSS 提供了非常多的插件来调整优先级，你可以自行按需选择，例如：

- [postcss-scopify](https://www.npmjs.com/package/postcss-scopify)
- [postcss-increase-specificity](https://www.npmjs.com/package/postcss-increase-specificity)
- [postcss-add-root-selector](https://www.npmjs.com/package/postcss-add-root-selector)

通过插件配置，将你的 css 样式进行提升：

```diff
--  .my-btn {
++  #root .my-btn {
      background: red;
    }
```

## CSS 逻辑属性

- 支持版本：`>=5.0.0`
- MDN 文档：[CSS Logical Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties)
- 浏览器兼容性：[caniuse](https://caniuse.com/css-logical-props)
- Chrome 最低支持版本：89
- 默认启用：是

为了统一 LTR 和 RTL 样式，Ant Design 使用了 CSS 逻辑属性。例如原 `margin-left` 使用 `margin-inline-start` 代替，使其在 LTR 和 RTL 下都为起始位置间距。如果你需要兼容旧版浏览器（如 360 浏览器、QQ 浏览器 等等），可以通过 `@ant-design/cssinjs@1.x` 的 `StyleProvider` 配置 `transformers` 将其转换：

```tsx | pure
import { legacyLogicalPropertiesTransformer, StyleProvider } from '@ant-design/cssinjs';

// `transformers` 提供预处理功能将样式进行转换
export default () => (
  <StyleProvider transformers={[legacyLogicalPropertiesTransformer]}>
    <MyApp />
  </StyleProvider>
);
```

切换后，样式将降级 CSS 逻辑属性：

```diff
.ant-modal-root {
-- inset: 0;
++ top: 0;
++ right: 0;
++ bottom: 0;
++ left: 0;
}
```

## `@layer` 样式优先级降权

- 支持版本：`>=5.17.0`
- MDN 文档：[@layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer)
- 浏览器兼容性：[caniuse](https://caniuse.com/?search=%40layer)
- Chrome 最低支持版本：99
- 默认启用：否

Ant Design 从 `5.17.0` 起支持配置 `layer` 进行统一降权。经过降权后，antd 的样式将始终低于默认的 CSS 选择器优先级，以便于用户进行样式覆盖（请务必注意检查 `@layer` 浏览器兼容性）。StyleProvider 开启 `layer` 时，子元素**必须**包裹 ConfigProvider 以更新图标相关样式：

```tsx | pure
import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';

export default () => (
  <StyleProvider layer>
    <ConfigProvider>
      <MyApp />
    </ConfigProvider>
  </StyleProvider>
);
```

antd 的样式会被封装在 `@layer` 中，以降低优先级：

```diff
++  @layer antd {
      :where(.css-bAMboO).ant-btn {
        color: #fff;
      }
++  }
```

## rem 适配

在响应式网页开发中，需要一种方便且灵活的方式来实现页面的适配和响应式设计。`px2remTransformer` 转换器可以快速而准确地将样式表中的像素单位转换为相对于根元素（HTML 标签）的 rem 单位，实现页面的自适应和响应式布局。

```tsx | pure
import { px2remTransformer, StyleProvider } from '@ant-design/cssinjs';

const px2rem = px2remTransformer({
  rootValue: 32, // 32px = 1rem; @default 16
});

export default () => (
  <StyleProvider transformers={[px2rem]}>
    <MyApp />
  </StyleProvider>
);
```

最终转换后的样式：

```diff
 .px2rem-box {
-  width: 400px;
+  width: 12.5rem;
   background-color: green;
-  font-size: 32px;
+  font-size: 1rem;
   border: 10PX solid #f0f;
 }

 @media only screen and (max-width: 600px) {
   .px2rem-box {
     background-color: red;
-    margin: 10px;
+    margin: 0.3125rem;
   }
 }
```

### 配置项

<!-- prettier-ignore -->
| 参数 | 说明  | 类型 | 默认值 |
| --- | --- | --- | --- |
| rootValue | 根元素字体大小 | `number` | 16 |
| precision | 转换后的小数点位数 | `number` | 5 |
| mediaQuery | 是否转换媒体查询中的 px | `boolean` | false |

详细请参考: [px2rem.ts#Options](https://github.com/ant-design/cssinjs/blob/master/src/transformers/px2rem.ts)

## Shadow DOM 场景

在 Shadow DOM 场景中，由于其添加 `<style />` 标签的方式与普通 DOM 不同，所以需要使用 `@ant-design/cssinjs@1.x` 的 `StyleProvider` 配置 `container` 属性用于设置插入位置：

```tsx
import { StyleProvider } from '@ant-design/cssinjs';
import { createRoot } from 'react-dom/client';

const shadowRoot = someEle.attachShadow({ mode: 'open' });
const container = document.createElement('div');
shadowRoot.appendChild(container);
const root = createRoot(container);

root.render(
  <StyleProvider container={shadowRoot}>
    <MyApp />
  </StyleProvider>,
);
```

## 兼容三方样式库

在某些情况下，你可能需要 antd 与其他样式库共存，比如 `Tailwind CSS`、`Emotion`、`styled-components` 等。不同于传统 CSS 方案，这些三方库往往不太容易通过提升 CSS 选择器优先级的方式覆盖 antd 的样式。你可以通过为 antd 配置 `@layer` 降低其 CSS 选择器权重，同时通过合理安排 `@layer` 顺序来解决样式覆盖问题：

### antd 配置 `@layer`

如前所述，使用 StyleProvider 时必须包裹 ConfigProvider 以更新图标相关样式：

```tsx
import { StyleProvider } from '@ant-design/cssinjs';

export default () => (
  <StyleProvider layer>
    <ConfigProvider>
      <MyApp />
    </ConfigProvider>
  </StyleProvider>
);
```

### TailwindCSS 排布 `@layer`

在开始以下配置前，你需要先启用 [`@layer`](#layer-样式优先级降权) 功能。

#### TailwindCSS v3

在 global.css 中，调整 `@layer` 来控制样式的覆盖顺序。让 `tailwind-base` 置于 `antd` 之前：

```less
@layer tailwind-base, antd;

@layer tailwind-base {
  @tailwind base;
}
@tailwind components;
@tailwind utilities;
```

#### TailwindCSS v4

在 global.css 中，调整 `@layer` 来控制样式的覆盖顺序，让 `antd` 置于恰当位置：

```less
@layer theme, base, antd, components, utilities;

@import 'tailwindcss';
```

### reset.css

如果你使用了 antd 的 `reset.css` 样式，你需要为其也指定 `@layer` 以防止将 antd 降权的样式覆盖：

```less
@layer reset, antd;

@import url(reset.css) layer(reset);
```

### 其他 CSS-in-JS 库

当你为 antd 配置完 `@layer` 后，你不需要为其他的 CSS-in-JS 库做任何额外的配置。你的 CSS-in-JS 已经可以完全覆盖 antd 的样式了。

### SSR 场景

在 SSR 场景下，样式往往会通过 `<style />` 内联渲染到 HTML 中。此时请务必确保你的样式顺序中指定 `@layer` 优先级顺序的样式在 `@layer` 被使用之前被加载。

#### ❌ 错误的写法

```html
<head>
  <!-- SSR 注入样式 -->
  <style>
    @layer antd {
      /** ... */
    }
  </style>

  <!-- css 文件中包含 @layer xxx, antd; -->
  <link rel="stylesheet" href="/b9a0m0b9o0o3.css" />
  <!-- or 直接书写 @layer xxx, antd; 在 html 中 -->
  <style>
    @layer xxx, antd;
  </style>
</head>
```

#### ✅ 正确的写法

```html
<head>
  <!-- css 文件中包含 @layer xxx, antd; -->
  <link rel="stylesheet" href="/b9a0m0b9o0o3.css" />
  <!-- or 直接书写 @layer xxx, antd; 在 html 中 -->
  <style>
    @layer xxx, antd;
  </style>

  <!-- SSR 注入样式 -->
  <style>
    @layer antd {
      /** ... */
    }
  </style>
</head>
```
