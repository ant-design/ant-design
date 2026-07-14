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
<code src="./demo/focus-outline-debug.tsx" debug>聚焦描边调试</code>

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

以下配置项用于设置对应组件的通用属性或全局效果配置，具体 API 见链接：

- `affix`：[Affix](/components/affix-cn#api)（自 6.0.0 起支持）
- `alert`：[Alert](/components/alert-cn#api)（自 5.7.0 起支持）
- `anchor`：[Anchor](/components/anchor-cn#api)（自 6.0.0 起支持）
- `app`：[App](/components/app-cn#api)（自 6.3.0 起支持）
- `avatar`：[Avatar](/components/avatar-cn#api)（自 5.7.0 起支持）
- `badge`：[Badge](/components/badge-cn#api)（自 5.7.0 起支持）
- `borderBeam`：[BorderBeam](/components/border-beam-cn#api)（自 6.4.0 起支持）
- `breadcrumb`：[Breadcrumb](/components/breadcrumb-cn#api)（自 5.7.0 起支持）
- `button`：[Button](/components/button-cn#api)（自 5.6.0 起支持）
- `calendar`：[Calendar](/components/calendar-cn#api)（自 6.0.0 起支持）
- `card`：[Card](/components/card-cn#api)（自 5.14.0 起支持）
- `cardMeta`：[Card.Meta](/components/card-cn#cardmeta)（自 6.0.0 起支持）
- `carousel`：[Carousel](/components/carousel-cn#api)（自 5.7.0 起支持）
- `cascader`：[Cascader](/components/cascader-cn#api)（自 5.13.0 起支持）
- `checkbox`：[Checkbox](/components/checkbox-cn#api)（自 6.0.0 起支持）
- `collapse`：[Collapse](/components/collapse-cn#api)（自 5.15.0 起支持）
- `colorPicker`：[ColorPicker](/components/color-picker-cn#api)（自 6.3.0 起支持）
- `datePicker`：[DatePicker](/components/date-picker-cn#api)（自 5.7.0 起支持）
- `rangePicker`：[RangePicker](/components/date-picker-cn#rangepicker)（自 5.11.0 起支持）
- `descriptions`：[Descriptions](/components/descriptions-cn#api)（自 5.23.0 起支持）
- `divider`：[Divider](/components/divider-cn#api)（自 5.10.0 起支持）
- `drawer`：[Drawer](/components/drawer-cn#api)（自 5.10.0 起支持）
- `dropdown`：[Dropdown](/components/dropdown-cn#api)（自 5.11.0 起支持）
- `empty`：[Empty](/components/empty-cn#api)（自 5.23.0 起支持）
- `flex`：[Flex](/components/flex-cn#api)（自 5.10.0 起支持）
- `floatButton`：[FloatButton](/components/float-button-cn#api)（自 6.0.0 起支持）
- `floatButtonGroup`：[FloatButton.Group](/components/float-button-cn#floatbuttongroup)（自 5.16.0 起支持）
- `form`：[Form](/components/form-cn#api)（自 4.8.0 起支持）
- `image`：[Image](/components/image-cn#api)（自 5.14.0 起支持）
- `input`：[Input](/components/input-cn#input)（自 4.2.0 起支持）
- `inputNumber`：[InputNumber](/components/input-number-cn#api)（自 5.19.0 起支持）
- `otp`：[Input.OTP](/components/input-cn#inputotp)（自 6.0.0 起支持）
- `inputPassword`：[Input.Password](/components/input-cn#inputpassword)（自 6.4.0 起支持）
- `inputSearch`：[Input.Search](/components/input-cn#inputsearch)（自 6.4.0 起支持）
- `textArea`：[Input.TextArea](/components/input-cn#inputtextarea)（自 5.15.0 起支持）
- `layout`：[Layout](/components/layout-cn#api)（自 5.7.0 起支持）
- `list`：[List](/components/list-cn#api)（自 5.7.0 起支持）
- `masonry`：[Masonry](/components/masonry-cn#api)（自 6.0.0 起支持）
- `menu`：[Menu](/components/menu-cn#api)（自 5.15.0 起支持）
- `mentions`：[Mentions](/components/mentions-cn#api)（自 5.13.0 起支持）
- `message`：[Message](/components/message-cn#api)（自 5.7.0 起支持）
- `modal`：[Modal](/components/modal-cn#api)（自 5.10.0 起支持）
- `notification`：[Notification](/components/notification-cn#api)（自 5.14.0 起支持）
- `pagination`：[Pagination](/components/pagination-cn#api)（自 6.0.0 起支持）
- `progress`：[Progress](/components/progress-cn#api)（自 5.7.0 起支持）
- `radio`：[Radio](/components/radio-cn#api)（自 6.0.0 起支持）
- `rate`：[Rate](/components/rate-cn#api)（自 5.7.0 起支持）
- `result`：[Result](/components/result-cn#api)（自 6.0.0 起支持）
- `ribbon`：[Badge.Ribbon](/components/badge-cn#badgeribbon)（自 6.0.0 起支持）
- `skeleton`：[Skeleton](/components/skeleton-cn#api)（自 6.0.0 起支持）
- `segmented`：[Segmented](/components/segmented-cn#api)（自 6.0.0 起支持）
- `select`：[Select](/components/select-cn#api)（自 5.13.0 起支持）
- `slider`：[Slider](/components/slider-cn#api)（自 5.23.0 起支持）
- `switch`：[Switch](/components/switch-cn#api)（自 6.0.0 起支持）
- `space`：[Space](/components/space-cn#api)（自 5.6.0 起支持）
- `splitter`：[Splitter](/components/splitter-cn#api)（自 5.21.0 起支持）
- `spin`：[Spin](/components/spin-cn#api)（自 5.20.0 起支持）
- `statistic`：[Statistic](/components/statistic-cn#api)（自 6.0.0 起支持）
- `steps`：[Steps](/components/steps-cn#api)（自 5.10.0 起支持）
- `table`：[Table](/components/table-cn#api)（自 6.2.0 起支持）
- `tabs`：[Tabs](/components/tabs-cn#api)（自 5.14.0 起支持）
- `tag`：[Tag](/components/tag-cn#api)（自 5.14.0 起支持）
- `timeline`：[Timeline](/components/timeline-cn#api)（自 6.0.0 起支持）
- `timePicker`：[TimePicker](/components/time-picker-cn#api)（自 5.13.0 起支持）
- `tour`：[Tour](/components/tour-cn#api)（自 5.14.0 起支持）
- `tooltip`：[Tooltip](/components/tooltip-cn#api)（自 6.1.0 起支持）
- `popover`：[Popover](/components/popover-cn#api)（自 5.23.0 起支持）
- `popconfirm`：[Popconfirm](/components/popconfirm-cn#api)（自 5.23.0 起支持）
- `qrcode`：[QRCode](/components/qr-code-cn#api)（自 6.0.0 起支持）
- `transfer`：[Transfer](/components/transfer-cn#api)（自 5.7.0 起支持）
- `tree`：[Tree](/components/tree-cn#api)（自 6.0.0 起支持）
- `treeSelect`：[TreeSelect](/components/tree-select-cn#api)（自 5.19.0 起支持）
- `typography`：[Typography](/components/typography-cn#api)（自 6.4.0 起支持）
- `upload`：[Upload](/components/upload-cn#api)（自 5.27.0 起支持）
- `watermark`：[Watermark](/components/watermark-cn#api)（自 6.0.0 起支持）
- `wave`：[WaveConfig](#waveconfig)（自 5.8.0 起支持）

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
