---
order: 6.5
title: CSS Compatible
---

Ant Design supports the last 2 versions of modern browsers. If you need to be compatible with legacy browsers, please perform downgrade processing according to actual needs:

### Compatible adjustment

Ant Design default using CSS-in-JS with `:where` Selector to reduce priority to avoid user additional adjust style cost when updating. If you want to support old browser (or some other CSS framework selector priority conflict like TailwindCSS), you can use `@ant-design/cssinjs` to adjust this behavior (Please note keep version align with antd):

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

### CSS Logical Properties

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
