---
category: Components
type: Other
cols: 1
title: ConfigProvider
---

`ConfigProvider` provides a uniform configuration support for components.

## Usage

This component provides a configuration to all React components underneath itself via the [context API](https://facebook.github.io/react/docs/context.html). In the render tree all components will have access to the provided config.

```jsx
import { ConfigProvider } from 'antd';

// ...

return (
  <ConfigProvider {...yourConfig}>
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
| autoInsertSpaceInButton | Set `false` to remove space between 2 chinese characters on Button | boolean | true |  |
| componentSize | Config antd component size | `small` \| `middle` \| `large` | - |  |
| csp | Set [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) config | { nonce: string } | - |  |
| form | Set Form common props | { validateMessages?: [ValidateMessages](/components/form/#validateMessages) } | - |  |
| renderEmpty | set empty content of components. Ref [Empty](/components/empty/) | Function(componentName: string): ReactNode | - |  |
| getPopupContainer | to set the container of the popup element. The default is to create a `div` element in `body`. | Function(triggerNode) | `() => document.body` |  |
| locale | language package setting, you can find the packages in [antd/es/locale](http://unpkg.com/antd/es/locale/) | object |  |
| prefixCls | set prefix class. `Note:` This will discard default styles from `antd`. | string | ant |  |
| pageHeader | Unify the ghost of PageHeader, ref [PageHeader](/components/page-header) | { ghost:boolean } | 'true' |  |
| direction | set direction of layout. See [demo](#components-config-provider-demo-direction) | `ltr` \| `rtl` | `ltr` |  |

## FAQ

#### Does the locale problem still exist in DatePicker even if ConfigProvider `locale` is used?

Please make sure you set moment locale by `moment.locale('zh-cn')` or that you don't have two different versions of moment.

#### Modal throw error when setting `getPopupContainer`?

Related issue: https://github.com/ant-design/ant-design/issues/19974

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
