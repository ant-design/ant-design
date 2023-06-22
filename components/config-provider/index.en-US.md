---
category: Components
group: Other
title: ConfigProvider
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*NVKORa7BCVwAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*YC4ERpGAddoAAAAAAAAAAAAADrJ8AQ/original
---

`ConfigProvider` provides a uniform configuration support for components.

## Usage

This component provides a configuration to all React components underneath itself via the [context API](https://facebook.github.io/react/docs/context.html). In the render tree all components will have access to the provided config.

```tsx
import { ConfigProvider } from 'antd';
import React from 'react';

// ...
const Demo: React.FC = () => (
  <ConfigProvider direction="rtl">
    <App />
  </ConfigProvider>
);

export default Demo;
```

### Content Security Policy

Some components use dynamic style to support wave effect. You can config `csp` prop if Content Security Policy (CSP) is enabled:

```tsx
<ConfigProvider csp={{ nonce: 'YourNonceCode' }}>
  <Button>My Button</Button>
</ConfigProvider>
```

## Examples

<!-- prettier-ignore -->
<code src="./demo/locale.tsx">Locale</code>
<code src="./demo/direction.tsx">Direction</code>
<code src="./demo/size.tsx">Component size</code>
<code src="./demo/theme.tsx">Theme</code>
<code src="./demo/prefixCls.tsx" debug>prefixCls</code>
<code src="./demo/useConfig.tsx" debug>useConfig</code>

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| autoInsertSpaceInButton | Set false to remove space between 2 chinese characters on Button | boolean | true |  |
| componentDisabled | Config antd component `disabled` | boolean | - | 4.21.0 |
| componentSize | Config antd component size | `small` \| `middle` \| `large` | - |  |
| csp | Set [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) config | { nonce: string } | - |  |
| direction | Set direction of layout. See [demo](#components-config-provider-demo-direction) | `ltr` \| `rtl` | `ltr` |  |
| popupMatchSelectWidth | Determine whether the dropdown menu and the select input are the same width. Default set `min-width` same as input. Will ignore when value less than select width. `false` will disable virtual scroll | boolean \| number | - | 5.5.0 |
| popupOverflow | Select like component popup logic. Can set to show in viewport or follow window scroll | 'viewport' \| 'scroll' <InlinePopover previewURL="https://user-images.githubusercontent.com/5378891/230344474-5b9f7e09-0a5d-49e8-bae8-7d2abed6c837.png"></InlinePopover> | 'viewport' | 5.5.0 |
| form | Set Form common props | { validateMessages?: [ValidateMessages](/components/form/#validatemessages), requiredMark?: boolean \| `optional`, scrollToFirstError?: boolean \| [Options](https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options) } | - | requiredMark: 4.8.0; colon: 4.18.0; scrollToFirstError: 5.2.0 |
| getPopupContainer | To set the container of the popup element. The default is to create a `div` element in `body` | function(triggerNode) | () => document.body |  |
| getTargetContainer | Config Affix, Anchor scroll target container | () => HTMLElement | () => window | 4.2.0 |
| iconPrefixCls | Set icon prefix className | string | `anticon` | 4.11.0 |
| input | Set Input common props | { autoComplete?: string } | - | 4.2.0 |
| select | Set Select common props | { showSearch?: boolean } | - |  |
| button | Set Select common props | { className?: string, style?: React.CSSProperties, classNames?: { icon: string }, styles?: { icon: React.CSSProperties } } | - | 5.6.0 |
| locale | Language package setting, you can find the packages in [antd/locale](http://unpkg.com/antd/locale/) | object | - |  |
| prefixCls | Set prefix className | string | `ant` |  |
| renderEmpty | Set empty content of components. Ref [Empty](/components/empty/) | function(componentName: string): ReactNode | - |  |
| space | Set Space common props, ref [Space](/components/space) | { size: `small` \| `middle` \| `large` \| `number`, className?: string, style?: React.CSSProperties, classNames?: { item: string }, styles?: { item: React.CSSProperties } } | - | 5.6.0 |
| theme | Set theme, ref [Customize Theme](/docs/react/customize-theme) | - | - | 5.0.0 |
| virtual | Disable virtual scroll when set to `false` | boolean | - | 4.3.0 |

### ConfigProvider.config()

Setting `Modal`、`Message`、`Notification` static config. Not work on hooks.

```ts
ConfigProvider.config({
  prefixCls: 'ant',
  iconPrefixCls: 'anticon',

  // 5.6.0+
  // Please use hooks version first
  theme: { token: { colorPrimary: 'red' } },
});
```

### ConfigProvider.useConfig() `5.3.0+`

Available since `5.2.0`. Get the value of the parent `Provider`. Such as `DisabledContextProvider`, `SizeContextProvider`.

```jsx
const {
  componentDisabled, // 5.3.0+
  componentSize, // 5.3.0+
} = ConfigProvider.useConfig();
```

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| componentDisabled | antd component disabled state | boolean | - | 5.3.0 |
| componentSize | antd component size state | `small` \| `middle` \| `large` | - | 5.3.0 |

## FAQ

#### How to contribute a new language?

See [&lt;Adding new language&gt;](/docs/react/i18n#adding-newplanguage).

#### Date-related components locale is not working?

See FAQ [Date-related-components-locale-is-not-working?](/docs/react/faq#date-related-components-locale-is-not-working)

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

#### Why can't ConfigProvider props (like `prefixCls` and `theme`) affect ReactNode inside `message.info`, `notification.open`, `Modal.confirm`?

antd will dynamic create React instance by `ReactDOM.render` when call message methods. Whose context is different with origin code located context. We recommend `useMessage`, `useNotification` and `useModal` which , the methods came from `message/notification/Modal` has been deprecated in 5.x.

#### Locale is not working with Vite in production mode?

Related issue: [#39045](https://github.com/ant-design/ant-design/issues/39045)

In production mode of Vite, default exports from cjs file should be used like this: `enUS.default`. So you can directly import locale from `es/` directory like `import enUS from 'antd/es/locale/en_US'` to make dev and production have the same behavior.
