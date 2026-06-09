---
category: Components
group: Other
title: ConfigProvider
description: Provide a uniform configuration support for components.
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*NVKORa7BCVwAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*YC4ERpGAddoAAAAAAAAAAAAADrJ8AQ/original
---

## Usage

This component provides a configuration to all React components underneath itself via the [context API](https://react.dev/learn/passing-data-deeply-with-context). In the render tree all components will have access to the provided config.

```tsx
import React from 'react';
import { ConfigProvider } from 'antd';

// ...
const Demo: React.FC = () => (
  <ConfigProvider direction="rtl">
    <App />
  </ConfigProvider>
);

export default Demo;
```

### Content Security Policy {#csp}

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
<code src="./demo/wave.tsx">Custom Wave</code>
<code src="./demo/holderRender.tsx">Static function</code>
<code src="./demo/prefixCls.tsx" debug>prefixCls</code>
<code src="./demo/useConfig.tsx" debug>useConfig</code>
<code src="./demo/warning.tsx" debug>warning</code>

## API

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| componentDisabled | Config antd component `disabled` | boolean | - | 4.21.0 |
| componentSize | Config antd component size | `small` \| `medium` \| `large` | - |  |
| csp | Set [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) config | { nonce: string } | - |  |
| direction | Set direction of layout. See [demo](#config-provider-demo-direction) | `ltr` \| `rtl` | `ltr` |  |
| getPopupContainer | To set the container of the popup element. The default is to create a `div` element in `body` | `(trigger?: HTMLElement) => HTMLElement \| ShadowRoot` | () => document.body |  |
| getTargetContainer | Config Affix, Anchor scroll target container | `() => HTMLElement \| Window \| ShadowRoot` | () => window | 4.2.0 |
| iconPrefixCls | Set icon prefix className | string | `anticon` | 4.11.0 |
| locale | Language package setting, you can find the packages in [antd/locale](https://unpkg.com/antd/locale/) | object | - |  |
| popupMatchSelectWidth | Determine whether the dropdown menu and the select input are the same width. Default set `min-width` same as input. Will ignore when value less than select width. `false` will disable virtual scroll | boolean \| number | - | 5.5.0 |
| popupOverflow | Select like component popup logic. Can set to show in viewport or follow window scroll | 'viewport' \| 'scroll' <InlinePopover previewURL="https://user-images.githubusercontent.com/5378891/230344474-5b9f7e09-0a5d-49e8-bae8-7d2abed6c837.png"></InlinePopover> | 'viewport' | 5.5.0 |
| prefixCls | Set prefix className | string | `ant` |  |
| renderEmpty | Set empty content of components. Ref [Empty](/components/empty/) | function(componentName: string): ReactNode | - |  |
| theme | Set theme, ref [Customize Theme](/docs/react/customize-theme) | [Theme](/docs/react/customize-theme#theme) | - | 5.0.0 |
| variant | Set variant of data entry components | `outlined` \| `filled` \| `borderless` | - | 5.19.0 |
| virtual | Disable virtual scroll when set to `false` | boolean | - | 4.3.0 |
| warning | Config warning level, when `strict` is `false`, it will aggregate deprecated information into a single message | { strict: boolean } | - | 5.10.0 |
| ~~autoInsertSpaceInButton~~ | Button auto spacing config, please use `button={{ autoInsertSpace: boolean }}` instead | boolean | - | - |
| ~~dropdownMatchSelectWidth~~ | Determine whether the dropdown menu and the select input are the same width, please use `popupMatchSelectWidth` instead | boolean | - | - |

### ConfigProvider.config() {#config}

Setting `Modal`, `Message`, `Notification` static config. Not work on hooks.

```tsx
ConfigProvider.config({
  // 5.13.0+
  holderRender: (children) => (
    <ConfigProvider
      prefixCls="ant"
      iconPrefixCls="anticon"
      theme={{ token: { colorPrimary: 'red' } }}
    >
      {children}
    </ConfigProvider>
  ),
});
```

### ConfigProvider.useConfig() <Badge>5.3.0+</Badge> {#useconfig}

Get the value of the parent `Provider`, Such as `DisabledContextProvider`, `SizeContextProvider`.

```jsx
const {
  componentDisabled, // 5.3.0+
  componentSize, // 5.3.0+
} = ConfigProvider.useConfig();
```

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| componentDisabled | antd component disabled state | boolean | - | 5.3.0 |
| componentSize | antd component size state | `small` \| `medium` \| `large` | - | 5.3.0 |

### Component Config

| Property | Description | Type | Default | Version |
| --- | --- | --- | --- | --- |
| affix | Set Affix common props | See [Affix](/components/affix#api) | - | 6.0.0 |
| alert | Set Alert common props | See [Alert](/components/alert#api) | - | 5.7.0 |
| anchor | Set Anchor common props | See [Anchor](/components/anchor#api) | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| app | Set App common props | See [App](/components/app#api) | - | 6.3.0 |
| avatar | Set Avatar common props | See [Avatar](/components/avatar#api) | - | 5.7.0 |
| badge | Set Badge common props | See [Badge](/components/badge#api) | - | 5.7.0 |
| borderBeam | Set BorderBeam common props | See [BorderBeam](/components/border-beam#api) | - | 6.4.0 |
| breadcrumb | Set Breadcrumb common props | See [Breadcrumb](/components/breadcrumb#api) | - | 5.7.0 |
| button | Set Button common props | See [Button](/components/button#api) | - | 5.6.0 |
| card | Set Card common props | See [Card](/components/card#api) | - | 5.7.0, `classNames` and `styles`: 5.14.0, `variant`: 5.24.0 |
| cardMeta | Set Card.Meta common props | See [Card.Meta](/components/card#cardmeta) | - | 6.0.0 |
| calendar | Set Calendar common props | See [Calendar](/components/calendar#api) | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| carousel | Set Carousel common props | See [Carousel](/components/carousel#api) | - | 5.7.0 |
| cascader | Set Cascader common props | See [Cascader](/components/cascader#api) | - | 5.7.0, `variant`: 5.13.0, `classNames` and `styles`: 6.0.0, `expandIcon`, `loadingIcon`, `searchIcon`, `clearIcon`, `removeIcon`, `suffixIcon`: 6.4.0 |
| checkbox | Set Checkbox common props | See [Checkbox](/components/checkbox#api) | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| collapse | Set Collapse common props | See [Collapse](/components/collapse#api) | - | 5.7.0, `expandIcon`: 5.15.0, `classNames` and `styles`: 6.0.0 |
| colorPicker | Set ColorPicker common props | See [ColorPicker](/components/color-picker#api) | - | 5.7.0, `arrow`: 6.3.0 |
| datePicker | Set DatePicker common props | See [DatePicker](/components/date-picker#api) | - | 5.7.0 |
| rangePicker | Set RangePicker common props | See [RangePicker](/components/date-picker#rangepicker) | - | 5.11.0 |
| descriptions | Set Descriptions common props | See [Descriptions](/components/descriptions#api) | - | 5.7.0, `classNames` and `styles`: 5.23.0 |
| divider | Set Divider common props | See [Divider](/components/divider#api) | - | 5.10.0, `classNames` and `styles`: 6.0.0 |
| drawer | Set Drawer common props | See [Drawer](/components/drawer#api) | - | 5.7.0, `classNames` and `styles`: 5.10.0, `closeIcon`: 5.14.0, `mask`: 6.0.0, `mask.closable`: 6.3.0, `focusable`: 6.4.0 |
| dropdown | Set Dropdown common props | See [Dropdown](/components/dropdown#api) | - |  |
| empty | Set Empty common props | See [Empty](/components/empty#api) | - | 5.7.0, `classNames` and `styles`: 5.23.0, `image`: 5.27.0 |
| flex | Set Flex common props | See [Flex](/components/flex#api) | - | 5.10.0 |
| floatButton | Set FloatButton common props | See [FloatButton](/components/float-button#api) | - |  |
| floatButtonGroup | Set FloatButton.Group common props | See [FloatButton.Group](/components/float-button#floatbuttongroup) | - |  |
| form | Set Form common props | See [Form](/components/form#api) | - | `requiredMark`: 4.8.0; `colon`: 4.18.0; `scrollToFirstError`: 5.2.0; `className` and `style`: 5.7.0; `tooltip`: 6.3.0; `labelAlign`: 6.4.0 |
| image | Set Image common props | See [Image](/components/image#api) | - | 5.7.0, `closeIcon`: 5.14.0, `preview.mask.closable`: 6.4.0, `classNames` and `styles`: 6.0.0 |
| input | Set Input common props | See [Input](/components/input#input) | - | 4.2.0, `classNames` and `styles`: 5.7.0, `allowClear`: 5.15.0, `variant`: 5.13.0, `allowClear.disabled`: 6.4.0 |
| inputNumber | Set InputNumber common props | See [InputNumber](/components/input-number#api) | - | 5.19.0, `classNames` and `styles`: 6.0.0 |
| otp | Set OTP common props | See [Input.OTP](/components/input#inputotp) | - |  |
| inputPassword | Set Password common props | See [Input.Password](/components/input#inputpassword) | - | 6.4.0 |
| inputSearch | Set Search common props | See [Input.Search](/components/input#inputsearch) | - | `searchIcon`: 6.4.0 |
| textArea | Set TextArea common props | See [Input.TextArea](/components/input#inputtextarea) | - | 5.15.0, `variant`: 5.15.0 |
| layout | Set Layout common props | See [Layout](/components/layout#api) | - | 5.7.0 |
| list | Set List common props | See [List](/components/list#api) | - | 5.7.0 |
| masonry | Set Masonry common props | See [Masonry](/components/masonry#api) | - |  |
| menu | Set Menu common props | See [Menu](/components/menu#api) | - | 5.7.0, `expandIcon`: 5.15.0, `classNames` and `styles`: 6.0.0 |
| mentions | Set Mentions common props | See [Mentions](/components/mentions#api) | - | 5.7.0, `variant`: 5.13.0, `classNames` and `styles`: 6.0.0, `allowClear`: 6.4.0 |
| message | Set Message common props | See [Message](/components/message#api) | - | 5.7.0 |
| modal | Set Modal common props | See [Modal](/components/modal#api) | - | 5.7.0, `classNames` and `styles`: 5.10.0, `closeIcon`: 5.14.0, `closable`: 5.16.0, `centered`: 5.24.0, `okButtonProps`, `cancelButtonProps` and `mask`: 6.0.0, `mask.closable`: 6.3.0, `focusable`, `infoIcon`, `successIcon`, `errorIcon` and `warningIcon`: 6.4.0 |
| notification | Set Notification common props | See [Notification](/components/notification#api) | - | 5.7.0, `closeIcon`: 5.14.0, `classNames` and `styles`: 6.0.0 |
| pagination | Set Pagination common props | See [Pagination](/components/pagination#api) | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| progress | Set Progress common props | See [Progress](/components/progress#api) | - |  |
| radio | Set Radio common props | See [Radio](/components/radio#api) | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| rate | Set Rate common props | See [Rate](/components/rate#api) | - | 5.7.0 |
| result | Set Result common props | See [Result](/components/result#api) | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| ribbon | Set Ribbon common props | See [Badge.Ribbon](/components/badge#badgeribbon) | - | 6.0.0 |
| skeleton | Set Skeleton common props | See [Skeleton](/components/skeleton#api) | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| segmented | Set Segmented common props | See [Segmented](/components/segmented#api) | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| select | Set Select common props | See [Select](/components/select#api) | - | 5.7.0, `variant`: 5.13.0, `classNames` and `styles`: 6.0.0, `allowClear`, `clearIcon`, `loadingIcon`, `menuItemSelectedIcon`, `removeIcon`, `suffixIcon`: 6.4.0 |
| slider | Set Slider common props | See [Slider](/components/slider#api) | - | 5.7.0, `classNames` and `styles`: 5.23.0 |
| switch | Set Switch common props | See [Switch](/components/switch#api) | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| space | Set Space common props | See [Space](/components/space#api) | - | 5.6.0 |
| splitter | Set Splitter common props | See [Splitter](/components/splitter#api) | - | 5.21.0 |
| spin | Set Spin common props | See [Spin](/components/spin#api) | - | 5.7.0, `indicator`: 5.20.0, `classNames` and `styles`: 6.0.0 |
| statistic | Set Statistic common props | See [Statistic](/components/statistic#api) | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| steps | Set Steps common props | See [Steps](/components/steps#api) | - | 5.10.0, `classNames` and `styles`: 6.0.0 |
| table | Set Table common props | See [Table](/components/table#api) | - | `scroll`: 6.2.0 |
| tabs | Set Tabs common props | See [Tabs](/components/tabs#api) | - | 5.7.0, `moreIcon` and `addIcon`: 5.14.0, `removeIcon`: 5.15.0, `more`: 5.17.0, `classNames` and `styles`: 6.0.0 |
| tag | Set Tag common props | See [Tag](/components/tag#api) | - | 5.7.0, `closeIcon`: 5.14.0, `variant`: 6.0.0, `classNames` and `styles`: 6.0.0 |
| timeline | Set Timeline common props | See [Timeline](/components/timeline#api) | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| timePicker | Set TimePicker common props | See [TimePicker](/components/time-picker#api) | - | 5.7.0, `variant`: 5.13.0, `suffixIcon`: 6.3.0, `allowClear`, `clearIcon`: 6.4.0 |
| tour | Set Tour common props | See [Tour](/components/tour#api) | - | 5.14.0, `classNames`、`styles`、`className`、`style`: 6.0.0 |
| tooltip | Set Tooltip common props | See [Tooltip](/components/tooltip#api) | - | `trigger`: 6.1.0 |
| popover | Set Popover common props | See [Popover](/components/popover#api) | - | 5.23.0, `arrow`: 6.0.0, `trigger`: 6.1.0 |
| popconfirm | Set Popconfirm common props | See [Popconfirm](/components/popconfirm#api) | - | 5.23.0, `arrow`: 6.0.0, `trigger`: 6.1.0 |
| qrcode | Set QRCode common props | See [QRCode](/components/qr-code#api) | - |  |
| transfer | Set Transfer common props | See [Transfer](/components/transfer#api) | - |  |
| tree | Set Tree common props | See [Tree](/components/tree#api) | - | 5.7.0, `classNames` and `styles`: 6.0.0 |
| treeSelect | Set TreeSelect common props | See [TreeSelect](/components/tree-select#api) | - | 5.19.0, `switcherIcon`: 5.28.0, `classNames` and `styles`: 6.0.0 |
| typography | Set Typography common props | See [Typography](/components/typography#api) | - | 5.7.0, `classNames` and `styles`: 6.4.0 |
| upload | Set Upload common props | See [Upload](/components/upload#api) | - | 5.7.0, `customRequest`: 5.27.0, `classNames` and `styles`: 6.0.0, `accept` and `progress`: 6.4.0 |
| watermark | Set Watermark common props | See [Watermark](/components/watermark#api) | - | 6.0.0 |
| wave | Config wave effect | { disabled?: boolean, showEffect?: (node: HTMLElement, info: { className, token, component }) => void, triggerType?: `click` \| `pointerdown` \| `pointerup` \| `mousedown` \| `mouseup` } | - | 5.8.0, `triggerType`: 6.4.0 |

## FAQ

### How to contribute a new language? {#faq-add-locale}

See [&lt;Adding new language&gt;](/docs/react/i18n#adding-newplanguage).

### Date-related components locale is not working? {#faq-locale-not-work}

See FAQ [Date-related-components-locale-is-not-working?](/docs/react/faq#date-related-components-locale-is-not-working)

### Modal throw error when setting `getPopupContainer`? {#faq-get-popup-container}

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

### Why can't ConfigProvider props (like `prefixCls` and `theme`) affect ReactNode inside `message.info`, `notification.open`, `Modal.confirm`? {#faq-message-inherit}

antd will dynamic create React instance by `ReactDOM.render` when call message methods. Whose context is different with origin code located context. We recommend `useMessage`, `useNotification` and `useModal` which , the methods came from `message/notification/Modal` has been deprecated in 5.x.

### Locale is not working with Vite in production mode? {#faq-vite-locale-not-work}

Related issue: [#39045](https://github.com/ant-design/ant-design/issues/39045)

In production mode of Vite, default exports from cjs file should be used like this: `enUS.default`. So you can directly import locale from `es/` directory like `import enUS from 'antd/es/locale/en_US'` to make dev and production have the same behavior.

### `prefixCls` priority(The former is covered by the latter) {#faq-prefixcls-priority}

1. `ConfigProvider.config({ prefixCls: 'prefix-1' })`
2. `ConfigProvider.config({ holderRender: (children) => <ConfigProvider prefixCls="prefix-2">{children}</ConfigProvider> })`
3. `message.config({ prefixCls: 'prefix-3' })`
