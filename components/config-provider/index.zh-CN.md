---
category: Components
subtitle: 全局化配置
group: 其他
title: ConfigProvider
description: 为组件提供统一的全局化配置。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*NVKORa7BCVwAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*YC4ERpGAddoAAAAAAAAAAAAADrJ8AQ/original
---

## 使用 {#usage}

ConfigProvider 使用 React 的 [context](https://zh-hans.react.dev/learn/passing-data-deeply-with-context) 特性，只需在应用外围包裹一次即可全局生效。

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

### 内容安全策略（CSP）{#csp}

部分组件为了支持波纹效果，使用了动态样式。如果开启了 Content Security Policy (CSP)，你可以通过 `csp` 属性来进行配置：

```tsx
<ConfigProvider csp={{ nonce: 'YourNonceCode' }}>
  <Button>My Button</Button>
</ConfigProvider>
```

## 代码演示 {#examples}

<!-- prettier-ignore -->
<code src="./demo/locale.tsx">国际化</code>
<code src="./demo/direction.tsx">方向</code>
<code src="./demo/size.tsx">组件尺寸</code>
<code src="./demo/theme.tsx">主题</code>
<code src="./demo/wave.tsx">自定义波纹</code>
<code src="./demo/holderRender.tsx">静态方法</code>
<code src="./demo/prefixCls.tsx" debug>前缀</code>
<code src="./demo/useConfig.tsx" debug>获取配置</code>
<code src="./demo/warning.tsx" debug>警告</code>

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| componentDisabled | 设置 antd 组件禁用状态 | boolean | - | 4.21.0 |
| componentSize | 设置 antd 组件大小 | `small` \| `medium` \| `large` | - |  |
| csp | 设置 [Content Security Policy](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP) 配置 | { nonce: string } | - |  |
| direction | 设置文本展示方向。 [示例](#config-provider-demo-direction) | `ltr` \| `rtl` | `ltr` |  |
| getPopupContainer | 弹出框（Select, Tooltip, Menu 等等）渲染父节点，默认渲染到 body 上。 | `(trigger?: HTMLElement) => HTMLElement \| ShadowRoot` | () => document.body |  |
| getTargetContainer | 配置 Affix、Anchor 滚动监听容器。 | `() => HTMLElement \| Window \| ShadowRoot` | () => window | 4.2.0 |
| iconPrefixCls | 设置图标统一样式前缀 | string | `anticon` | 4.11.0 |
| locale | 语言包配置，语言包可到 [antd/locale](https://unpkg.com/antd/locale/) 目录下寻找 | object | - |  |
| popupMatchSelectWidth | 下拉菜单和选择器同宽。默认将设置 `min-width`，当值小于选择框宽度时会被忽略。`false` 时会关闭虚拟滚动 | boolean \| number | - | 5.5.0 |
| popupOverflow | Select 类组件弹层展示逻辑，默认为可视区域滚动，可配置成滚动区域滚动 | 'viewport' \| 'scroll' <InlinePopover previewURL="https://user-images.githubusercontent.com/5378891/230344474-5b9f7e09-0a5d-49e8-bae8-7d2abed6c837.png"></InlinePopover> | 'viewport' | 5.5.0 |
| prefixCls | 设置统一样式前缀 | string | `ant` |  |
| renderEmpty | 自定义组件空状态。参考 [空状态](/components/empty-cn) | function(componentName: string): ReactNode | - |  |
| theme | 设置主题，参考 [定制主题](/docs/react/customize-theme-cn) | [Theme](/docs/react/customize-theme-cn#theme) | - | 5.0.0 |
| variant | 设置全局输入组件形态变体 | `outlined` \| `filled` \| `borderless` | - | 5.19.0 |
| virtual | 设置 `false` 时关闭虚拟滚动 | boolean | - | 4.3.0 |
| warning | 设置警告等级，`strict` 为 `false` 时会将废弃相关信息聚合为单条信息 | { strict: boolean } | - | 5.10.0 |
| ~~autoInsertSpaceInButton~~ | Button 自动空格配置，请使用 `button={{ autoInsertSpace: boolean }}` 替代 | boolean | - | - |
| ~~dropdownMatchSelectWidth~~ | 下拉菜单和选择器是否同宽，请使用 `popupMatchSelectWidth` 替代 | boolean | - | - |

### ConfigProvider.config() {#config}

设置 `Modal`、`Message`、`Notification` 静态方法配置，只会对非 hooks 的静态方法调用生效。

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

获取父级 `Provider` 的值，如 `DisabledContextProvider`、`SizeContextProvider`。

```jsx
const {
  componentDisabled, // 5.3.0+
  componentSize, // 5.3.0+
} = ConfigProvider.useConfig();
```

<!-- prettier-ignore -->
| 返回值 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| componentDisabled | antd 组件禁用状态 | boolean | - | 5.3.0 |
| componentSize | antd 组件大小状态 | `small` \| `medium` \| `large` | - | 5.3.0 |

### 组件配置 {#component-config}

| 参数 | 说明 | 类型 | 版本 |
| --- | --- | --- | --- |
| affix | 设置 Affix 组件的通用属性 | 参见 [Affix](/components/affix-cn#api) | 6.0.0 |
| alert | 设置 Alert 组件的通用属性 | 参见 [Alert](/components/alert-cn#api) | 5.7.0 |
| anchor | 设置 Anchor 组件的通用属性 | 参见 [Anchor](/components/anchor-cn#api) | 6.0.0 |
| app | 设置 App 组件的通用属性 | 参见 [App](/components/app-cn#api) | 6.3.0 |
| avatar | 设置 Avatar 组件的通用属性 | 参见 [Avatar](/components/avatar-cn#api) | 5.7.0 |
| badge | 设置 Badge 组件的通用属性 | 参见 [Badge](/components/badge-cn#api) | 5.7.0 |
| borderBeam | 设置 BorderBeam 组件的通用属性 | 参见 [BorderBeam](/components/border-beam-cn#api) | 6.4.0 |
| breadcrumb | 设置 Breadcrumb 组件的通用属性 | 参见 [Breadcrumb](/components/breadcrumb-cn#api) | 5.7.0 |
| button | 设置 Button 组件的通用属性 | 参见 [Button](/components/button-cn#api) | 5.6.0 |
| calendar | 设置 Calendar 组件的通用属性 | 参见 [Calendar](/components/calendar-cn#api) | 6.0.0 |
| card | 设置 Card 组件的通用属性 | 参见 [Card](/components/card-cn#api) | 5.14.0 |
| cardMeta | 设置 Card.Meta 组件的通用属性 | 参见 [Card.Meta](/components/card-cn#cardmeta) | 6.0.0 |
| carousel | 设置 Carousel 组件的通用属性 | 参见 [Carousel](/components/carousel-cn#api) | 5.7.0 |
| cascader | 设置 Cascader 组件的通用属性 | 参见 [Cascader](/components/cascader-cn#api) | 5.13.0 |
| checkbox | 设置 Checkbox 组件的通用属性 | 参见 [Checkbox](/components/checkbox-cn#api) | 6.0.0 |
| collapse | 设置 Collapse 组件的通用属性 | 参见 [Collapse](/components/collapse-cn#api) | 5.15.0 |
| colorPicker | 设置 ColorPicker 组件的通用属性 | 参见 [ColorPicker](/components/color-picker-cn#api) | 6.3.0 |
| datePicker | 设置 DatePicker 组件的通用属性 | 参见 [DatePicker](/components/date-picker-cn#api) | 5.7.0 |
| rangePicker | 设置 RangePicker 组件的通用属性 | 参见 [RangePicker](/components/date-picker-cn#rangepicker) | 5.11.0 |
| descriptions | 设置 Descriptions 组件的通用属性 | 参见 [Descriptions](/components/descriptions-cn#api) | 5.23.0 |
| divider | 设置 Divider 组件的通用属性 | 参见 [Divider](/components/divider-cn#api) | 5.10.0 |
| drawer | 设置 Drawer 组件的通用属性 | 参见 [Drawer](/components/drawer-cn#api) | 5.10.0 |
| dropdown | 设置 Dropdown 组件的通用属性 | 参见 [Dropdown](/components/dropdown-cn#api) | 5.11.0 |
| empty | 设置 Empty 组件的通用属性 | 参见 [Empty](/components/empty-cn#api) | 5.23.0 |
| flex | 设置 Flex 组件的通用属性 | 参见 [Flex](/components/flex-cn#api) | 5.10.0 |
| floatButton | 设置 FloatButton 组件的通用属性 | 参见 [FloatButton](/components/float-button-cn#api) | 6.0.0 |
| floatButtonGroup | 设置 FloatButton.Group 组件的通用属性 | 参见 [FloatButton.Group](/components/float-button-cn#floatbuttongroup) | 5.16.0 |
| form | 设置 Form 组件的通用属性 | 参见 [Form](/components/form-cn#api) | 4.8.0 |
| image | 设置 Image 组件的通用属性 | 参见 [Image](/components/image-cn#api) | 5.14.0 |
| input | 设置 Input 组件的通用属性 | 参见 [Input](/components/input-cn#input) | 4.2.0 |
| inputNumber | 设置 InputNumber 组件的通用属性 | 参见 [InputNumber](/components/input-number-cn#api) | 5.19.0 |
| otp | 设置 OTP 组件的通用属性 | 参见 [Input.OTP](/components/input-cn#inputotp) | 6.0.0 |
| inputPassword | 设置 Password 组件的通用属性 | 参见 [Input.Password](/components/input-cn#inputpassword) | 6.4.0 |
| inputSearch | 设置 Search 组件的通用属性 | 参见 [Input.Search](/components/input-cn#inputsearch) | 6.4.0 |
| textArea | 设置 TextArea 组件的通用属性 | 参见 [Input.TextArea](/components/input-cn#inputtextarea) | 5.15.0 |
| layout | 设置 Layout 组件的通用属性 | 参见 [Layout](/components/layout-cn#api) | 5.7.0 |
| list | 设置 List 组件的通用属性 | 参见 [List](/components/list-cn#api) | 5.7.0 |
| masonry | 设置 Masonry 组件的通用属性 | 参见 [Masonry](/components/masonry-cn#api) | 6.0.0 |
| menu | 设置 Menu 组件的通用属性 | 参见 [Menu](/components/menu-cn#api) | 5.15.0 |
| mentions | 设置 Mentions 组件的通用属性 | 参见 [Mentions](/components/mentions-cn#api) | 5.13.0 |
| message | 设置 Message 组件的通用属性 | 参见 [Message](/components/message-cn#api) | 5.7.0 |
| modal | 设置 Modal 组件的通用属性 | 参见 [Modal](/components/modal-cn#api) | 5.10.0 |
| notification | 设置 Notification 组件的通用属性 | 参见 [Notification](/components/notification-cn#api) | 5.14.0 |
| pagination | 设置 Pagination 组件的通用属性 | 参见 [Pagination](/components/pagination-cn#api) | 6.0.0 |
| progress | 设置 Progress 组件的通用属性 | 参见 [Progress](/components/progress-cn#api) | 5.7.0 |
| radio | 设置 Radio 组件的通用属性 | 参见 [Radio](/components/radio-cn#api) | 6.0.0 |
| rate | 设置 Rate 组件的通用属性 | 参见 [Rate](/components/rate-cn#api) | 5.7.0 |
| result | 设置 Result 组件的通用属性 | 参见 [Result](/components/result-cn#api) | 6.0.0 |
| ribbon | 设置 Ribbon 组件的通用属性 | 参见 [Badge.Ribbon](/components/badge-cn#badgeribbon) | 6.0.0 |
| skeleton | 设置 Skeleton 组件的通用属性 | 参见 [Skeleton](/components/skeleton-cn#api) | 6.0.0 |
| segmented | 设置 Segmented 组件的通用属性 | 参见 [Segmented](/components/segmented-cn#api) | 6.0.0 |
| select | 设置 Select 组件的通用属性 | 参见 [Select](/components/select-cn#api) | 5.13.0 |
| slider | 设置 Slider 组件的通用属性 | 参见 [Slider](/components/slider-cn#api) | 5.23.0 |
| switch | 设置 Switch 组件的通用属性 | 参见 [Switch](/components/switch-cn#api) | 6.0.0 |
| space | 设置 Space 组件的通用属性 | 参见 [Space](/components/space-cn#api) | 5.6.0 |
| splitter | 设置 Splitter 组件的通用属性 | 参见 [Splitter](/components/splitter-cn#api) | 5.21.0 |
| spin | 设置 Spin 组件的通用属性 | 参见 [Spin](/components/spin-cn#api) | 5.20.0 |
| statistic | 设置 Statistic 组件的通用属性 | 参见 [Statistic](/components/statistic-cn#api) | 6.0.0 |
| steps | 设置 Steps 组件的通用属性 | 参见 [Steps](/components/steps-cn#api) | 5.10.0 |
| table | 设置 Table 组件的通用属性 | 参见 [Table](/components/table-cn#api) | 6.2.0 |
| tabs | 设置 Tabs 组件的通用属性 | 参见 [Tabs](/components/tabs-cn#api) | 5.14.0 |
| tag | 设置 Tag 组件的通用属性 | 参见 [Tag](/components/tag-cn#api) | 5.14.0 |
| timeline | 设置 Timeline 组件的通用属性 | 参见 [Timeline](/components/timeline-cn#api) | 6.0.0 |
| timePicker | 设置 TimePicker 组件的通用属性 | 参见 [TimePicker](/components/time-picker-cn#api) | 5.13.0 |
| tour | 设置 Tour 组件的通用属性 | 参见 [Tour](/components/tour-cn#api) | 5.14.0 |
| tooltip | 设置 Tooltip 组件的通用属性 | 参见 [Tooltip](/components/tooltip-cn#api) | 6.1.0 |
| popover | 设置 Popover 组件的通用属性 | 参见 [Popover](/components/popover-cn#api) | 5.23.0 |
| popconfirm | 设置 Popconfirm 组件的通用属性 | 参见 [Popconfirm](/components/popconfirm-cn#api) | 5.23.0 |
| qrcode | 设置 QRCode 组件的通用属性 | 参见 [QRCode](/components/qr-code-cn#api) | 6.0.0 |
| transfer | 设置 Transfer 组件的通用属性 | 参见 [Transfer](/components/transfer-cn#api) | 5.7.0 |
| tree | 设置 Tree 组件的通用属性 | 参见 [Tree](/components/tree-cn#api) | 6.0.0 |
| treeSelect | 设置 TreeSelect 组件的通用属性 | 参见 [TreeSelect](/components/tree-select-cn#api) | 5.19.0 |
| typography | 设置 Typography 组件的通用属性 | 参见 [Typography](/components/typography-cn#api) | 6.4.0 |
| upload | 设置 Upload 组件的通用属性 | 参见 [Upload](/components/upload-cn#api) | 5.27.0 |
| watermark | 设置 Watermark 组件的通用属性 | 参见 [Watermark](/components/watermark-cn#api) | 6.0.0 |
| wave | 设置水波纹特效 | 参见 [WaveConfig](#waveconfig) | 5.8.0 |

### WaveConfig

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| disabled | 是否禁用水波纹效果 | boolean | false |  |
| showEffect | 自定义水波纹效果 | (node: HTMLElement, info: { className, token, component }) => void | - |  |
| triggerType | 触发水波纹效果的事件 | `click` \| `pointerdown` \| `pointerup` \| `mousedown` \| `mouseup` | `click` | 6.4.0 |

## FAQ

### 如何增加一个新的语言包？ {#faq-add-locale}

参考[《增加语言包》](/docs/react/i18n#%E5%A2%9E%E5%8A%A0%E8%AF%AD%E8%A8%80%E5%8C%85)。

### 为什么时间类组件的国际化 locale 设置不生效？ {#faq-locale-not-work}

参考 FAQ [为什么时间类组件的国际化 locale 设置不生效？](/docs/react/faq#为什么时间类组件的国际化-locale-设置不生效)。

### 配置 `getPopupContainer` 导致 Modal 报错？ {#faq-get-popup-container}

相关 issue：<https://github.com/ant-design/ant-design/issues/19974>

当如下全局设置 `getPopupContainer` 为触发节点的 parentNode 时，由于 Modal 的用法不存在 `triggerNode`，这样会导致 `triggerNode is undefined` 的报错，需要增加一个[判断条件](https://github.com/afc163/feedback-antd/commit/3e4d1ad1bc1a38460dc3bf3c56517f737fe7d44a)。

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

### 为什么 message.info、notification.open 或 Modal.confirm 等方法内的 ReactNode 无法继承 ConfigProvider 的属性？比如 `prefixCls` 和 `theme`。 {#faq-message-inherit}

静态方法是使用 ReactDOM.render 重新渲染一个 React 根节点上，和主应用的 React 节点是脱离的。我们建议使用 useMessage、useNotification 和 useModal 来使用相关方法。原先的静态方法在 5.0 中已被废弃。

### Vite 生产模式打包后国际化 locale 设置不生效？ {#faq-vite-locale-not-work}

相关 issue：[#39045](https://github.com/ant-design/ant-design/issues/39045)

由于 Vite 生产模式下打包与开发模式不同，cjs 格式的文件会多一层，需要 `zhCN.default` 来获取。推荐 Vite 用户直接从 `antd/es/locale` 目录下引入 esm 格式的 locale 文件。

### prefixCls 优先级(前者被后者覆盖) {#faq-prefixcls-priority}

1. `ConfigProvider.config({ prefixCls: 'prefix-1' })`
2. `ConfigProvider.config({ holderRender: (children) => <ConfigProvider prefixCls="prefix-2">{children}</ConfigProvider> })`
3. `message.config({ prefixCls: 'prefix-3' })`
