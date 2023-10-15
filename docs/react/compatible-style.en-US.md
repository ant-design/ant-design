---
group:
  title: Advanced
order: 1
title: CSS Compatible
---

Ant Design supports the last 2 versions of modern browsers. If you need to be compatible with legacy browsers, please perform downgrade processing according to actual needs:

## StyleProvider

Please ref [`@ant-design/cssinjs`](https://github.com/ant-design/cssinjs#styleprovider).

## Compatible adjustment

The CSS-in-JS feature of Ant Design uses the ":where" selector by default to lower the CSS selector specificity, reducing the additional cost of adjusting custom styles when upgrading for users. However, the compatibility of the ":where" syntax is relatively poor in older browsers ([compatibility](https://developer.mozilla.org/en-US/docs/Web/CSS/:where#browser_compatibility)). In certain scenarios, if you need to support older browsers (or encounter priority conflicts like TailwindCSS), you can use `@ant-design/cssinjs` to disable the default lowering of specificity (please ensure version consistency with antd).

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
import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs';

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
import { StyleProvider, px2remTransformer } from '@ant-design/cssinjs';

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
