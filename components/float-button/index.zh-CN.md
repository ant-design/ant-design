---
category: Components
group: 通用
title: FloatButton
subtitle: 悬浮按钮
description: 悬浮于页面上方的按钮。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*tXAoQqyr-ioAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*hSAwR7cnabwAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
tag: 5.0.0
---

## 何时使用

- 用于网站上的全局功能；
- 无论浏览到何处都可以看见的按钮。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx" iframe="360">基本</code>
<code src="./demo/type.tsx" iframe="360">类型</code>
<code src="./demo/shape.tsx" iframe="360">形状</code>
<code src="./demo/description.tsx" iframe="360">描述</code>
<code src="./demo/tooltip.tsx" iframe="360">含有气泡卡片的悬浮按钮</code>
<code src="./demo/group.tsx" iframe="360">浮动按钮组</code>
<code src="./demo/group-menu.tsx" iframe="360">菜单模式</code>
<code src="./demo/controlled.tsx" iframe="360">受控模式</code>
<code src="./demo/placement.tsx" iframe="380" version="5.21.0">弹出方向</code>
<code src="./demo/back-top.tsx" iframe="360">回到顶部</code>
<code src="./demo/badge.tsx" iframe="360">徽标数</code>
<code src="./demo/badge-debug.tsx" iframe="360" debug>调试小圆点使用</code>
<code src="./demo/render-panel.tsx" debug>\_InternalPanelDoNotUseOrYouWillBeFired</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

> 自 `antd@5.0.0` 版本开始提供该组件。

### 共同的 API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| icon | 自定义图标 | ReactNode | - |  |
| description | 文字及其它内容 | ReactNode | - |  |
| tooltip | 气泡卡片的内容 | ReactNode \| () => ReactNode | - |  |
| type | 设置按钮类型 | `default` \| `primary` | `default` |  |
| shape | 设置按钮形状 | `circle` \| `square` | `circle` |  |
| onClick | 点击按钮时的回调 | (event) => void | - |  |
| href | 点击跳转的地址，指定此属性 button 的行为和 a 链接一致 | string | - |  |
| target | 相当于 a 标签的 target 属性，href 存在时生效 | string | - |  |
| htmlType | 设置 `button` 原生的 `type` 值，可选值请参考 [HTML 标准](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button#type) | `submit` \| `reset` \| `button` | `button` | 5.21.0 |
| badge | 带徽标数字的悬浮按钮（不支持 `status` 以及相关属性） | [BadgeProps](/components/badge-cn#api) | - | 5.4.0 |

### FloatButton.Group

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| shape | 设置包含的 FloatButton 按钮形状 | `circle` \| `square` | `circle` |  |
| trigger | 触发方式（有触发方式为菜单模式） | `click` \| `hover` | - |  |
| open | 受控展开，需配合 trigger 一起使用 | boolean | - |  |
| closeIcon | 自定义关闭按钮 | React.ReactNode | `<CloseOutlined />` |  |
| placement | 自定义菜单弹出位置 | `top` \| `left` \| `right` \| `bottom` | `top` | 5.21.0 |
| onOpenChange | 展开收起时的回调，需配合 trigger 一起使用 | (open: boolean) => void | - |  |
| onClick | 点击按钮时的回调（仅在菜单模式中有效） | (event) => void | - | 5.3.0 |

### FloatButton.BackTop

| 参数             | 说明                               | 类型              | 默认值       | 版本 |
| ---------------- | ---------------------------------- | ----------------- | ------------ | ---- |
| duration         | 回到顶部所需时间（ms）             | number            | 450          |      |
| target           | 设置需要监听其滚动事件的元素       | () => HTMLElement | () => window |      |
| visibilityHeight | 滚动高度达到此参数值才出现 BackTop | number            | 400          |      |
| onClick          | 点击按钮的回调函数                 | () => void        | -            |      |

## 主题变量（Design Token）

<ComponentTokenTable component="FloatButton"></ComponentTokenTable>
