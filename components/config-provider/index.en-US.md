---
category: Components
type: Other
cols: 1
title: ConfigProvider
cover: https://gw.alipayobjects.com/zos/alicdn/kegYxl1wj/ConfigProvider.svg
---

`ConfigProvider` provides a uniform configuration support for components.

## Usage

This component provides a configuration to all React components underneath itself via the [context API](https://facebook.github.io/react/docs/context.html). In the render tree all components will have access to the provided config.

```jsx
import { ConfigProvider } from 'antd';

// ...

export default () => (
  <ConfigProvider direction="rtl">
    <App />
  </ConfigProvider>
);
```

### Content Security Policy

Some components use dynamic style to support wave effect. You can config `csp` prop if Content Security Policy (CSP) is enabled:

```jsx
<ConfigProvider csp={{ nonce: 'YourNonceCode' }}>
  <Button>My Button</Button>
</ConfigProvider>
```

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoInsertSpaceInButton | Set false to remove space between 2 chinese characters on Button | boolean | true |  |
| componentSize | Config antd component size | `small` \| `middle` \| `large` | - |  |
| csp | Set [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) config | { nonce: string } | - |  |
| direction | Set direction of layout. See [demo](#components-config-provider-demo-direction) | `ltr` \| `rtl` | `ltr` |  |
| dropdownMatchSelectWidth | Determine whether the dropdown menu and the select input are the same width. Default set `min-width` same as input. Will ignore when value less than select width. `false` will disable virtual scroll | boolean \| number | - | 4.3.0 |
| form | Set Form common props | { validateMessages?: [ValidateMessages](/components/form/#validateMessages) } | - |  |
| getPopupContainer | To set the container of the popup element. The default is to create a `div` element in `body` | function(triggerNode) | () => document.body |  |
| getTargetContainer | Config Affix, Anchor scroll target container | () => HTMLElement | () => window | 4.2.0 |
| input | Set Input common props | { autoComplete?: string } | - | 4.2.0 |
| locale | Language package setting, you can find the packages in [antd/lib/locale](http://unpkg.com/antd/lib/locale/) | object | - |  |
| pageHeader | Unify the ghost of PageHeader, ref [PageHeader](/components/page-header) | { ghost: boolean } | true |  |
| prefixCls | Set prefix className (cooperated with [@ant-prefix](https://github.com/ant-design/ant-design/blob/2c6c789e3a9356f96c47aea0083f5a15538315cf/components/style/themes/default.less#L7)) | string | `ant` |  |
| renderEmpty | Set empty content of components. Ref [Empty](/components/empty/) | function(componentName: string): ReactNode | - |  |
| space | Set Space `size`, ref [Space](/components/space) | { size: `small` \| `middle` \| `large` \| `number` } | - | 4.1.0 |
| virtual | Disable virtual scroll when set to `false` | boolean | - | 4.3.0 |

## FAQ

#### How to contribute a new language?

See [<Adding new language>](/docs/react/i18n#Adding-newplanguage).

#### Does the locale problem still exist in DatePicker even if ConfigProvider `locale` is used?

Please make sure you set moment locale or that you don't have two different versions of moment.

```js
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
```

#### Modal throw error when setting `getPopupContainer`?

Related issue: <https://github.com/ant-design/ant-design/issues/19974>

When you config `getPopupContainer` to parentNode globally, Modal will throw error of `triggerNode is undefined` because it did not have a triggerNode. You can try the [fix](https://github.com/afc163/feedback-antd/commit/3e4d1ad1bc1a38460dc3bf3c56517f737fe7d44a) below.

```diff
 <ConfigProvider
-  getPopupContainer={triggerNode => triggerNode.parentNode}
+  getPopupContainer={node => {
+    if (node) {
+      return node.parentNode;
+    }
+    return document.body;
+  }}
 >
   <App />
 </ConfigProvider>
```
