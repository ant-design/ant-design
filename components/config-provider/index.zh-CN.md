---
category: Components
subtitle: 全局化配置
cols: 1
type: 其他
title: ConfigProvider
cover: https://gw.alipayobjects.com/zos/alicdn/kegYxl1wj/ConfigProvider.svg
---

为组件提供统一的全局化配置。

## 使用

ConfigProvider 使用 React 的 [context](https://facebook.github.io/react/docs/context.html) 特性，只需在应用外围包裹一次即可全局生效。

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

部分组件为了支持波纹效果，使用了动态样式。如果开启了 Content Security Policy (CSP)，你可以通过 `csp` 属性来进行配置：

```jsx
<ConfigProvider csp={{ nonce: 'YourNonceCode' }}>
  <Button>My Button</Button>
</ConfigProvider>
```

## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autoInsertSpaceInButton | 设置为 `false` 时，移除按钮中 2 个汉字之间的空格 | boolean | true |  |
| componentSize | 设置 antd 组件大小 | `small` \| `middle` \| `large` | - |  |
| csp | 设置 [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) 配置 | { nonce: string } | - |  |
| direction | 设置文本展示方向。 [示例](#components-config-provider-demo-direction) | `ltr` \| `rtl` | `ltr` |  |
| dropdownMatchSelectWidth | 下拉菜单和选择器同宽。默认将设置 `min-width`，当值小于选择框宽度时会被忽略。`false` 时会关闭虚拟滚动 | boolean \| number | - | 4.3.0 |
| form | 设置 Form 组件的通用属性 | { validateMessages?: [ValidateMessages](/components/form/#validateMessages), requiredMark?: boolean \| `optional` } | - | requiredMark: 4.8.0 |
| getPopupContainer | 弹出框（Select, Tooltip, Menu 等等）渲染父节点，默认渲染到 body 上。 | function(triggerNode) | () => document.body |  |
| getTargetContainer | 配置 Affix、Anchor 滚动监听容器。 | () => HTMLElement | () => window | 4.2.0 |
| iconPrefixCls | 设置图标统一样式前缀。注意：需要配合 `less` 变量 [@iconfont-css-prefix](https://github.com/ant-design/ant-design/blob/d943b85a523bdf181dabc12c928226f3b4b893de/components/style/themes/default.less#L106) 使用 | string | `anticon` | 4.11.0 |
| input | 设置 Input 组件的通用属性 | { autoComplete?: string } | - | 4.2.0 |
| locale | 语言包配置，语言包可到 [antd/lib/locale](http://unpkg.com/antd/lib/locale/) 目录下寻找 | object | - |  |
| pageHeader | 统一设置 PageHeader 的 ghost，参考 [PageHeader](/components/page-header) | { ghost: boolean } | true |  |
| prefixCls | 设置统一样式前缀。注意：需要配合 `less` 变量 [@ant-prefix](https://github.com/ant-design/ant-design/blob/2c6c789e3a9356f96c47aea0083f5a15538315cf/components/style/themes/default.less#L7) 使用 | string | `ant` |  |
| renderEmpty | 自定义组件空状态。参考 [空状态](/components/empty/) | function(componentName: string): ReactNode | - |  |
| space | 设置 Space 的 `size`，参考 [Space](/components/space) | { size: `small` \| `middle` \| `large` \| `number` } | - | 4.1.0 |
| virtual | 设置 `false` 时关闭虚拟滚动 | boolean | - | 4.3.0 |

## FAQ

#### 如何增加一个新的语言包？

参考[《增加语言包》](/docs/react/i18n#%E5%A2%9E%E5%8A%A0%E8%AF%AD%E8%A8%80%E5%8C%85)。

#### 为什么我使用了 ConfigProvider `locale`，时间类组件的国际化还有问题？

请检查是否正确设置了 moment 语言包，或者是否有两个版本的 moment 共存。

```js
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
```

#### 配置 `getPopupContainer` 导致 Modal 报错？

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
