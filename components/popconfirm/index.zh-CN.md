---
category: Components
subtitle: 气泡确认框
type: 反馈
title: Popconfirm
cover: https://gw.alipayobjects.com/zos/alicdn/fjMCD9xRq/Popconfirm.svg
---

点击元素，弹出气泡式的确认框。

## 何时使用

目标元素的操作需要用户进一步的确认时，在目标元素附近弹出浮层提示，询问用户。

和 `confirm` 弹出的全屏居中模态对话框相比，交互形式更轻量。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| cancelText | 取消按钮文字 | string | `取消` |
| okText | 确认按钮文字 | string | `确定` |
| okType | 确认按钮类型 | string | `primary` |
| okButtonProps | ok 按钮 props | [ButtonProps](/components/button/#API) | - |
| cancelButtonProps | cancel 按钮 props | [ButtonProps](/components/button/#API) | - |
| title | 确认框的描述 | string \| ReactNode \| () => ReactNode | - |
| onCancel | 点击取消的回调 | function(e) | - |
| onConfirm | 点击确认的回调 | function(e) | - |
| icon | 自定义弹出气泡 Icon 图标 | ReactNode | &lt;ExclamationCircle /> |
| disabled | 点击 Popconfirm 子元素是否弹出气泡确认框 | boolean | false |

更多属性请参考 [Tooltip](/components/tooltip/#API)。

## 注意

请确保 `Popconfirm` 的子元素能接受 `onMouseEnter`、`onMouseLeave`、`onFocus`、`onClick` 事件。
