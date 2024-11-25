---
category: Components
group: 反馈
title: Popconfirm
subtitle: 气泡确认框
description: 点击元素，弹出气泡式的确认框。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*a7tqQ6wrdeAAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*iwYsQpeFcB0AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用

目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。

和 `confirm` 弹出的全屏居中模态对话框相比，交互形式更轻量。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本</code>
<code src="./demo/locale.tsx">国际化</code>
<code src="./demo/placement.tsx">位置</code>
<code src="./demo/shift.tsx" iframe="300">贴边偏移</code>
<code src="./demo/dynamic-trigger.tsx">条件触发</code>
<code src="./demo/icon.tsx">自定义 Icon 图标</code>
<code src="./demo/async.tsx">异步关闭</code>
<code src="./demo/promise.tsx">基于 Promise 的异步关闭</code>
<code src="./demo/render-panel.tsx" debug>_InternalPanelDoNotUseOrYouWillBeFired</code>
<code src="./demo/wireframe.tsx" debug>线框风格</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| cancelButtonProps | cancel 按钮 props | [ButtonProps](/components/button-cn#api) | - |  |
| cancelText | 取消按钮文字 | string | `取消` |  |
| disabled | 阻止点击 Popconfirm 子元素时弹出确认框 | boolean | false |  |
| icon | 自定义弹出气泡 Icon 图标 | ReactNode | &lt;ExclamationCircle /> |  |
| okButtonProps | ok 按钮 props | [ButtonProps](/components/button-cn#api) | - |  |
| okText | 确认按钮文字 | string | `确定` |  |
| okType | 确认按钮类型 | string | `primary` |  |
| showCancel | 是否显示取消按钮 | boolean | true | 4.18.0 |
| title | 确认框标题 | ReactNode \| () => ReactNode | - |  |
| description | 确认内容的详细描述 | ReactNode \| () => ReactNode | - | 5.1.0 |
| onCancel | 点击取消的回调 | function(e) | - |  |
| onConfirm | 点击确认的回调 | function(e) | - |  |
| onPopupClick | 弹出气泡点击事件 | function(e) | - | 5.5.0 |

更多属性请参考 [Tooltip](/components/tooltip-cn/#api)。

## 主题变量（Design Token）

<ComponentTokenTable component="Popconfirm"></ComponentTokenTable>

## FAQ

### 为何在严格模式中有时候会出现 `findDOMNode is deprecated` 这个警告？

这是由于 `rc-trigger` 的实现方式导致的，`rc-trigger` 强制要求 children 能够接受 ref，否则就会 fallback 到 findDOMNode，所以 children 需要是原生 html 标签，如果不是，则需要使用 `React.forwardRef` 把 `ref` 透传到原生 html 标签。

- `findDOMNode is deprecated` 重现：<https://codesandbox.io/p/sandbox/finddomnode-c5hy96>
- 使用 `forwardRef` 消除警告：<https://codesandbox.io/p/sandbox/no-finddomnode-warning-forked-gdxczs>

## 注意

请确保 `Popconfirm` 的子元素能接受 `onMouseEnter`、`onMouseLeave`、`onFocus`、`onClick` 事件。
