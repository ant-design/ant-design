---
group: 反馈
category: Components
subtitle: 抽屉
title: Drawer
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*BD2JSKm8I-kAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*r29rQ51bNdwAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
---

屏幕边缘滑出的浮层面板。

## 何时使用

抽屉从父窗体边缘滑入，覆盖住部分父窗体内容。用户在抽屉内操作时不必离开当前任务，操作完成后，可以平滑地回到原任务。

- 当需要一个附加的面板来控制父窗体内容，这个面板在需要时呼出。比如，控制界面展示样式，往界面中添加内容。
- 当需要在当前任务流中插入临时任务，创建或预览附加内容。比如展示协议条款，创建子对象。

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic-right.tsx">基础抽屉</code>
<code src="./demo/placement.tsx">自定义位置</code>
<code src="./demo/extra.tsx">额外操作</code>
<code src="./demo/render-in-current.tsx">渲染在当前 DOM</code>
<code src="./demo/form-in-drawer.tsx">抽屉表单</code>
<code src="./demo/user-profile.tsx">信息预览抽屉</code>
<code src="./demo/multi-level-drawer.tsx">多层抽屉</code>
<code src="./demo/size.tsx">预设宽度</code>
<code src="./demo/classNames.tsx">自定义内部样式</code>
<code src="./demo/config-provider.tsx" debug>ConfigProvider</code>
<code src="./demo/no-mask.tsx" debug>无遮罩</code>
<code src="./demo/render-panel.tsx" debug>_InternalPanelDoNotUseOrYouWillBeFired</code>
<code src="./demo/scroll-debug.tsx" debug>滚动锁定调试</code>
<code src="./demo/component-token.tsx" debug>组件 Token</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

<!-- prettier-ignore -->
:::info{title=注意}
v5 使用 `rootClassName` 与 `rootStyle` 来配置最外层元素样式。原 v4 `className` 与 `style` 改至配置 Drawer 窗体样式以和 Modal 对齐。
:::

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autoFocus | 抽屉展开后是否将焦点切换至其 DOM 节点 | boolean | true | 4.17.0 |
| afterOpenChange | 切换抽屉时动画结束后的回调 | function(open) | - |  |
| className | Drawer 容器外层 className 设置，如果需要设置最外层，请使用 rootClassName | string | - |  |
| classNames | 语义化结构 className | [Record<SemanticDOM, string>](#semantic-dom) | - | 5.10.0 |
| closeIcon | 自定义关闭图标。5.7.0：设置为 `null` 或 `false` 时隐藏关闭按钮 | ReactNode | &lt;CloseOutlined /> |  |
| destroyOnClose | 关闭时销毁 Drawer 里的子元素 | boolean | false |  |
| extra | 抽屉右上角的操作区域 | ReactNode | - | 4.17.0 |
| footer | 抽屉的页脚 | ReactNode | - |  |
| forceRender | 预渲染 Drawer 内元素 | boolean | false |  |
| getContainer | 指定 Drawer 挂载的节点，**并在容器内展现**，`false` 为挂载在当前位置 | HTMLElement \| () => HTMLElement \| Selectors \| false | body |  |
| height | 高度，在 `placement` 为 `top` 或 `bottom` 时使用 | string \| number | 378 |  |
| keyboard | 是否支持键盘 esc 关闭 | boolean | true |  |
| mask | 是否展示遮罩 | boolean | true |  |
| maskClosable | 点击蒙层是否允许关闭 | boolean | true |  |
| placement | 抽屉的方向 | `top` \| `right` \| `bottom` \| `left` | `right` |  |
| push | 用于设置多层 Drawer 的推动行为 | boolean \| { distance: string \| number } | { distance: 180 } | 4.5.0+ |
| rootStyle | 可用于设置 Drawer 最外层容器的样式，和 `style` 的区别是作用节点包括 `mask` | CSSProperties | - |  |
| size | 预设抽屉宽度（或高度），default `378px` 和 large `736px` | 'default' \| 'large' | 'default' | 4.17.0 |
| style | 设计 Drawer 容器样式，如果你只需要设置内容部分请使用 `bodyStyle` | CSSProperties | - |  |
| styles | 语义化结构 style | [Record<SemanticDOM, CSSProperties>](#semantic-dom) | - | 5.10.0 |
| title | 标题 | ReactNode | - |  |
| open | Drawer 是否可见 | boolean | - |
| width | 宽度 | string \| number | 378 |  |
| zIndex | 设置 Drawer 的 `z-index` | number | 1000 |  |
| onClose | 点击遮罩层或左上角叉或取消按钮的回调 | function(e) | - |  |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## 主题变量（Design Token）

<ComponentTokenTable component="Drawer"></ComponentTokenTable>
