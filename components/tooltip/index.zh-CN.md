---
category: Components
group: 数据展示
title: Tooltip
subtitle: 文字提示
description: 简单的文字提示气泡框。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*9LKlRbWytugAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*bCbPTJ7LQngAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

## 何时使用 {#when-to-use}

鼠标移入则显示提示，移出消失，气泡浮层不承载复杂文本和操作。

可用来代替系统默认的 `title` 提示，提供一个 `按钮/文字/操作` 的文案解释。

## 代码演示 {#examples}

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本</code>
<code src="./demo/smooth-transition.tsx">平滑过渡</code>
<code src="./demo/placement.tsx">位置</code>
<code src="./demo/arrow.tsx">箭头展示</code>
<code src="./demo/shift.tsx" iframe="300">贴边偏移</code>
<code src="./demo/auto-adjust-overflow.tsx" debug>自动调整位置</code>
<code src="./demo/destroy-on-close.tsx" debug>隐藏后销毁</code>
<code src="./demo/colorful.tsx">多彩文字提示</code>
<code src="./demo/render-panel.tsx" debug>_InternalPanelDoNotUseOrYouWillBeFired</code>
<code src="./demo/debug.tsx" debug>Debug</code>
<code src="./demo/disabled.tsx">禁用</code>
<code src="./demo/disabled-children.tsx" debug>禁用子元素</code>
<code src="./demo/wrap-custom-component.tsx">自定义子组件</code>
<code src="./demo/style-class.tsx" version="6.0.0">自定义语义结构的样式和类</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| title | 提示文字 | ReactNode \| () => ReactNode | - | - |
| color | 设置背景颜色，使用该属性后内部文字颜色将自适应 | string | - | 5.27.0 |
| classNames | 语义化结构 class | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), string> | - |  |
| styles | 语义化结构 style | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props }) => Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |

### 共同的 API

<embed src="./shared/sharedProps.zh-CN.md"></embed>

### ConfigProvider - tooltip.unique {#config-provider-tooltip-unique}

可以通过 ConfigProvider 全局配置 Tooltip 的唯一性显示。当 `unique` 设置为 `true` 时，同一时间 ConfigProvider 下的 Tooltip 只会显示一个，提供更好的用户体验和平滑的过渡效果。

注意：配置后 `getContainer`、`arrow` 等属性将会失效。

```tsx
import { Button, ConfigProvider, Space, Tooltip } from 'antd';

export default () => (
  <ConfigProvider
    tooltip={{
      unique: true,
    }}
  >
    <Space>
      <Tooltip title="第一个提示">
        <Button>按钮 1</Button>
      </Tooltip>
      <Tooltip title="第二个提示">
        <Button>按钮 2</Button>
      </Tooltip>
    </Space>
  </ConfigProvider>
);
```

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## 主题变量（Design Token）{#design-token}

<ComponentTokenTable component="Tooltip"></ComponentTokenTable>

## FAQ

### 为何有时候 HOC 组件无法生效？ {#faq-hoc-component}

请确保 `Tooltip` 的子元素能接受 `onMouseEnter`、`onMouseLeave`、`onPointerEnter`、`onPointerLeave`、`onFocus`、`onClick` 事件。

请查看 https://github.com/ant-design/ant-design/issues/15909

### 为何 Tooltip 的内容在关闭时不会更新？ {#faq-content-not-update}

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

---

<!-- 请确保在 FAQ 最后 -->

<embed src="./shared/sharedFAQ.zh-CN.md"></embed>
