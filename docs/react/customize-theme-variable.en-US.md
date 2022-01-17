---
order: 7.1
title: Dynamic Theme (Experimental)
---

Except [less customize theme](/docs/react/customize-theme), We also provide CSS Variable version to enable dynamic theme. You can check on [ConfigProvider](/components/config-provider/#components-config-provider-demo-theme) demo.

## Caveats

- This function depends on CSS Variables. Please check the [browser compatibility](https://caniuse.com/css-variables).
- This function requires at least `antd@4.17.0-alpha.0`.

## How to use

### Import antd.variable.min.css

Replace your import style file with CSS Variable version:

```diff
-- import 'antd/dist/antd.min.css';
++ import 'antd/dist/antd.variable.min.css';
```

Note: You need remove `babel-plugin-import` for the dynamic theme.

### Static config

Call ConfigProvider static function to modify theme color:

```ts
import { ConfigProvider } from 'antd';

ConfigProvider.config({
  theme: {
    primaryColor: '#25b864',
  },
});
```

## Conflict resolve

CSS Variable use `--ant` prefix by default. When exist multiple antd style file in your project, you can modify prefix to fix it.

### Adjust

Modify `prefixCls` on the root of ConfigProvider:

```tsx
import { ConfigProvider } from 'antd';

export default () => (
  <ConfigProvider prefixCls="custom">
    <MyApp />
  </ConfigProvider>
);
```

Also need call the static function to modify `prefixCls`:

```ts
ConfigProvider.config({
  prefixCls: 'custom',
  theme: {
    primaryColor: '#25b864',
  },
});
```

### Compile less

Since prefix modified. Origin `antd.variable.css` should also be replaced:

```bash
lessc --js --modify-var="ant-prefix=custom" antd/dist/antd.variable.less modified.css
```

### Related changes

In order to implement CSS Variable and maintain original usage compatibility, we added `@root-entry-name: xxx;` entry injection to the `dist/antd.xxx.less` file to support less dynamic loading of the corresponding less file. Under normal circumstances, you do not need to pay attention to this change. However, if your project directly references the less file in the `lib|es` directory. You need to configure `@root-entry-name: default;` (or `@root-entry-name: variable;`) at the entry of less so that less can find the correct entry.

In addition, we migrated `@import'motion'` and `@import'reset'` in `lib|es/style/minxins/index.less` to `lib|es/style/themes/xxx.less` In, because these two files rely on theme-related variables. If you use the relevant internal method, please adjust it yourself. Of course, we still recommend using the `antd.less` files in the `dist` directory directly instead of calling internal files, because they are often affected by refactoring.
