---
category: Components
subtitle: 气泡卡片
group: 数据展示
title: Popover
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*XhL3QpRw92kAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*RMP_TrdZ3nsAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

点击/鼠标移入元素，弹出气泡式的卡片浮层。

## 何时使用

当目标元素有进一步的描述和相关操作时，可以收纳到卡片中，根据用户的操作行为进行展现。

和 `Tooltip` 的区别是，用户可以对浮层上的元素进行操作，因此它可以承载更复杂的内容，比如链接或按钮等。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本</code>
<code src="./demo/triggerType.tsx">三种触发方式</code>
<code src="./demo/placement.tsx">位置</code>
<code src="./demo/arrow.tsx">箭头展示</code>
<code src="./demo/control.tsx">从浮层内关闭</code>
<code src="./demo/hover-with-click.tsx">悬停点击弹出窗口</code>
<code src="./demo/render-panel.tsx" debug>_InternalPanelDoNotUseOrYouWillBeFired</code>
<code src="./demo/wireframe.tsx" debug>线框风格</code>
<code src="./demo/component-token.tsx" debug>组件 Token</code>

## API

| 参数    | 说明     | 类型                         | 默认值 | 版本 |
| ------- | -------- | ---------------------------- | ------ | ---- |
| content | 卡片内容 | ReactNode \| () => ReactNode | -      |      |
| title   | 卡片标题 | ReactNode \| () => ReactNode | -      |      |

更多属性请参考 [Tooltip](/components/tooltip-cn/#api)。

## 注意

请确保 `Popover` 的子元素能接受 `onMouseEnter`、`onMouseLeave`、`onFocus`、`onClick` 事件。

## Design Token

<ComponentTokenTable component="Popover"></ComponentTokenTable>
