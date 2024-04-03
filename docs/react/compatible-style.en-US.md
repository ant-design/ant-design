---
group:
  title: Advanced
order: 1
title: CSS Compatible
---

Ant Design supports the last 2 versions of modern browsers. If you need to be compatible with legacy browsers, please perform downgrade processing according to actual needs:

## StyleProvider

Please ref [`@ant-design/cssinjs`](https://github.com/ant-design/cssinjs#styleprovider).

## `layer` Downgrade

Ant Design supports configuring `layer` for unified downgrade since `5.17.0`. After the downgrade, the style of antd will always be lower than the default CSS selector priority, so that users can override the style (please be sure to check the browser compatibility of `@layer`):

```tsx
import { StyleProvider } from '@ant-design/cssinjs';

export default () => (
  <StyleProvider layer>
    <MyApp />
  </StyleProvider>
);
```

antd styles will be encapsulated in `@layer` to lower the priority:

```diff
++  @layer antd {
      :where(.css-bAMboO).ant-btn {
        color: #fff;
      }
++  }
```

## Compatible adjustment

The CSS-in-JS feature of Ant Design uses the ":where" selector by default to lower the CSS selector specificity, reducing the additional cost of adjusting custom styles when upgrading for users. However, the compatibility of the ":where" syntax is relatively poor in older browsers ([compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/:where#browser_compatibility)). In certain scenarios, if you need to support older browsers, you can use `@ant-design/cssinjs` to disable the default lowering of specificity (please ensure version consistency with antd).

```tsx
import { StyleProvider } from '@ant-design/cssinjs';

// Config `hashPriority` to `high` instead of default `low`
// Which will remove `:where` wrapper
export default () => (
  <StyleProvider hashPriority="high">
    <MyApp />
  </StyleProvider>
);
```

It will turn `:where` to class selector:

```diff
--  :where(.css-bAMboO).ant-btn {
++  .css-bAMboO.ant-btn {
      color: #fff;
    }
```

Note: After turning off the `:where` downgrade, you may need to manually adjust the priority of some styles. Or you can **use PostCSS plugin** to raise application css selector priority. PostCSS provides many plugins can help on this. e.g:

- [postcss-scopify](https://www.npmjs.com/package/postcss-scopify)
- [postcss-increase-specificity](https://www.npmjs.com/package/postcss-increase-specificity)
- [postcss-add-root-selector](https://www.npmjs.com/package/postcss-add-root-selector)

Raise priority through plugin:

```diff
--  .my-btn {
++  #root .my-btn {
      background: red;
    }
```

## CSS Logical Properties

To unify LTR and RTL styles, Ant Design uses CSS logical properties. For example, the original `margin-left` is replaced by `margin-inline-start`, so that it is the starting position spacing under both LTR and RTL. If you need to be compatible with older browsers, you can configure `transformers` through the `StyleProvider` of `@ant-design/cssinjs`:

```tsx
import { legacyLogicalPropertiesTransformer, StyleProvider } from '@ant-design/cssinjs';

// `transformers` provides a way to transform CSS properties
export default () => (
  <StyleProvider transformers={[legacyLogicalPropertiesTransformer]}>
    <MyApp />
  </StyleProvider>
);
```

When toggled, styles will downgrade CSS logical properties:

```diff
.ant-modal-root {
-- inset: 0;
++ top: 0;
++ right: 0;
++ bottom: 0;
++ left: 0;
}
```

## Rem Adaptation

In responsive web development, there is a need for a convenient and flexible way to achieve page adaptation and responsive design. The `px2remTransformer` transformer can quickly and accurately convert pixel units in style sheets to rem units relative to the root element (HTML tag), enabling the implementation of adaptive and responsive layouts.

```tsx
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

The resulting transformed styles:

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

### Options

<!-- prettier-ignore -->
| Parameter | Description  | Type | Default |
| --- | --- | --- | --- |
| rootValue | Font size of the root element | `number` | 16 |
| precision | Decimal places for the converted value | `number` | 5 |
| mediaQuery | Whether to convert px in media queries | `boolean` | false |

For more details, please refer to: [px2rem.ts#Options](https://github.com/ant-design/cssinjs/blob/master/src/transformers/px2rem.ts)

## Shadow DOM Usage

Since `<style />` tag insertion is different from normal DOM in Shadow DOM scenario, you need to use `StyleProvider` of `@ant-design/cssinjs` to configure the `container` property to set the insertion position:

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

## Compatible with Third-party Style Libraries

In some cases, you may need antd to coexist with other style libraries, such as `Tailwind CSS`, `Emotion`, `styled-components`, etc. Unlike traditional CSS solutions, these third-party libraries are often not easy to override antd styles by increasing CSS selector priority. You can configure `@layer` for antd to lower its CSS selector weight, and arrange `@layer` order to solve style override problems:

### antd config `@layer`

```tsx
import { StyleProvider } from '@ant-design/cssinjs';

export default () => (
  <StyleProvider layer>
    <MyApp />
  </StyleProvider>
);
```

### TailwindCSS Arrange `@layer`

In global.css, adjust `@layer` to control the order of style override. Place `tailwind-base` before `antd`:

```less
@layer tailwind-base, antd;

@layer tailwind-base {
  @tailwind base;
}
@tailwind components;
@tailwind utilities;
```

### reset.css

If you use antd's `reset.css` style, you need to specify `@layer` for it to prevent the style from overriding antd:

```less
@layer reset, antd;

@import url(reset.css) layer(reset);
```

### With other CSS-in-JS libraries

After configuring `@layer` for antd, you don't need to do any additional configuration for other CSS-in-JS libraries. Your CSS-in-JS can completely override antd styles.

### SSR Scene

When using SSR, styles are often rendered inline in HTML through `<style />`. At this time, please make sure that the styles with the specified `@layer` priority order are loaded before `@layer` is used.

#### ❌ Wrong

```html
<head>
  <!-- SSR Injection style -->
  <style>
    @layer antd {
      /** ... */
    }
  </style>

  <!-- css file contains @layer xxx, antd; -->
  <link rel="stylesheet" href="/b9a0m0b9o0o3.css" />
  <!-- or write @layer xxx, antd; in html directly -->
  <style>
    @layer xxx, antd;
  </style>
</head>
```

#### ✅ Correct

```html
<head>
  <!-- css file contains @layer xxx, antd; -->
  <link rel="stylesheet" href="/b9a0m0b9o0o3.css" />
  <!-- or write @layer xxx, antd; in html directly -->
  <style>
    @layer xxx, antd;
  </style>

  <!-- SSR Injection style -->
  <style>
    @layer antd {
      /** ... */
    }
  </style>
</head>
```
