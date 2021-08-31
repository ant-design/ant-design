---
order: 7.1
title: Dynamic Theme (experience)
---

Except [less customize theme](/docs/react/customize-theme), We also provide CSS Variable version to enable dynamic theme. You can check on [ConfigProvider](/components/config-provider/#components-config-provider-demo-theme) demo.

## Notice

This function need CSS Variable support which mean it can not support IE. Please make sure your browser requirement.

## How to use

### Import antd.variable.min.css

Replace your import style file with CSS Variable version:

```diff
-- import 'antd/dist/antd.min.css';
++ import 'antd/dist/antd.variable.min.css';
```

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
  theme: {
    prefixCls: 'custom',
    primaryColor: '#25b864',
  },
});
```

### Compile less

Since prefix modified. Origin `antd.variable.css` should also be replaced:

```bash
lessc  --modify-var="ant-prefix=custom" antd/dist/antd.variable.less modified.css
```
