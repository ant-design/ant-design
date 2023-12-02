---
category: Components
subtitle: 文字提示
group: 数据展示
title: Tooltip
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*3u9eSZO_4c0AAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*gwrhTozoTC4AAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

简单的文字提示气泡框。

## 何时使用

鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作。

可用来代替系统默认的 `title` 提示，提供一个 `按钮/文字/操作` 的文案解释。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本</code>
<code src="./demo/placement.tsx">位置</code>
<code src="./demo/arrow.tsx">箭头展示</code>
<code src="./demo/shift.tsx" iframe="200">贴边偏移</code>
<code src="./demo/auto-adjust-overflow.tsx" debug>自动调整位置</code>
<code src="./demo/destroy-tooltip-on-hide.tsx" debug>隐藏后销毁</code>
<code src="./demo/colorful.tsx">多彩文字提示</code>
<code src="./demo/render-panel.tsx" debug>_InternalPanelDoNotUseOrYouWillBeFired</code>
<code src="./demo/debug.tsx" debug>Debug</code>
<code src="./demo/disabled.tsx">禁用</code>
<code src="./demo/disabled-children.tsx" debug>禁用子元素</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

| 参数  | 说明     | 类型                         | 默认值 |
| ----- | -------- | ---------------------------- | ------ |
| title | 提示文字 | ReactNode \| () => ReactNode | -      |

### 共同的 API

以下 API 为 Tooltip、Popconfirm、Popover 共享的 API。

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| align | 该值将合并到 placement 的配置中，设置参考 [rc-tooltip](https://github.com/react-component/tooltip) | object | - |  |
| arrow | 修改箭头的显示状态以及修改箭头是否指向目标元素中心 | boolean \| { pointAtCenter: boolean } | true | 5.2.0 |
| autoAdjustOverflow | 气泡被遮挡时自动调整位置 | boolean | true |  |
| color | 背景颜色 | string | - | 4.3.0 |
| defaultOpen | 默认是否显隐 | boolean | false | 4.23.0 |
| destroyTooltipOnHide | 关闭后是否销毁 Tooltip | boolean | false |  |
| fresh | 默认情况下，Tooltip 在关闭时会缓存内容。设置该属性后会始终保持更新 | boolean | false | 5.10.0 |
| getPopupContainer | 浮层渲染父节点，默认渲染到 body 上 | (triggerNode: HTMLElement) => HTMLElement | () => document.body |  |
| mouseEnterDelay | 鼠标移入后延时多少才显示 Tooltip，单位：秒 | number | 0.1 |  |
| mouseLeaveDelay | 鼠标移出后延时多少才隐藏 Tooltip，单位：秒 | number | 0.1 |  |
| overlayClassName | 卡片类名 | string | - |  |
| overlayStyle | 卡片样式 | object | - |  |
| overlayInnerStyle | 卡片内容区域的样式对象 | object | - |  |
| placement | 气泡框位置，可选 `top` `left` `right` `bottom` `topLeft` `topRight` `bottomLeft` `bottomRight` `leftTop` `leftBottom` `rightTop` `rightBottom` | string | `top` |  |
| trigger | 触发行为，可选 `hover` \| `focus` \| `click` \| `contextMenu`，可使用数组设置多个触发行为 | string \| string\[] | `hover` |  |
| open | 用于手动控制浮层显隐，小于 4.23.0 使用 `visible`（[为什么?](/docs/react/faq#弹层类组件为什么要统一至-open-属性)） | boolean | false | 4.23.0 |
| zIndex | 设置 Tooltip 的 `z-index` | number | - |  |
| onOpenChange | 显示隐藏的回调 | (open: boolean) => void | - | 4.23.0 |

## 主题变量（Design Token）

<ComponentTokenTable component="Tooltip"></ComponentTokenTable>

## FAQ

### 为何有时候 HOC 组件无法生效？

请确保 `Tooltip` 的子元素能接受 `onMouseEnter`、`onMouseLeave`、`onPointerEnter`、`onPointerLeave`、`onFocus`、`onClick` 事件。

### placement 的行为逻辑是什么？

当屏幕空间足够时，会按照 `placement` 的设置进行弹层。当空间不足时则会取反向位置进行弹层（例如 `top` 不够时，会改为 `bottom`，`topLeft` 不够时会改为 `bottomLeft`）。单一方向如 `top` `bottom` `left` `right` 当贴边时进行自动位移：

<img alt="shift" height="200" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*sxaTTJjLtIMAAAAAAAAAAAAADrJ8AQ/original" />

当设置为边缘对齐方向如 `topLeft` `bottomRight` 等，则会仅做翻转而不做位移。

### 为何 Tooltip 的内容在关闭时不会更新？

Tooltip 默认在关闭时会缓存内容，以防止内容更新时出现闪烁：

```jsx
// `title` 不会因为 `user` 置空而闪烁置空
<Tooltip open={user} title={user?.name} />
```

<div>
<img alt="no blink" height="50" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*KVx7QLOYwVsAAAAAAAAAAAAADrJ8AQ/original" />
</div>

如果需要在关闭时也更新内容，可以设置 `fresh` 属性（例如 [#44830](https://github.com/ant-design/ant-design/issues/44830) 中的场景）：

```jsx
<Tooltip open={user} title={user?.name} fresh />
```

<div>
<img alt="no blink" height="50" src="https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*rUbsR4xWpMsAAAAAAAAAAAAADrJ8AQ/original" />
</div>
