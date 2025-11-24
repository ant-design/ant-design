---
category: Components
title: Button
subtitle: 按钮
description: 按钮用于开始一个即时操作。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*7va7RKs3YzIAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*3T4cRqxH9-8AAAAAAAAAAAAADrJ8AQ/original
designUrl: /docs/spec/buttons-cn
demo:
  cols: 2
group:
  title: 通用
  order: 1
---

## 何时使用 {#when-to-use}

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

在 Ant Design 中我们提供了五种按钮。

- 🔵 主按钮：用于主行动点，一个操作区域只能有一个主按钮。
- ⚪️ 默认按钮：用于没有主次之分的一组行动点。
- 😶 虚线按钮：常用于添加操作。
- 🔤 文本按钮：用于最次级的行动点。
- 🔗 链接按钮：一般用于链接，即导航至某位置。

以及四种状态属性与上面配合使用。

- ⚠️ 危险：删除/移动/修改权限等危险操作，一般需要二次确认。
- 👻 幽灵：用于背景色比较复杂的地方，常用在首页/产品页等展示场景。
- 🚫 禁用：行动点不可用的时候，一般需要文案解释。
- 🔃 加载中：用于异步操作等待反馈的时候，也可以避免多次提交。

## 代码演示 {#examples}

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">语法糖</code>
<code src="./demo/color-variant.tsx" version="5.21.0">颜色与变体</code>
<code src="./demo/debug-color-variant" debug>调试颜色与变体</code>
<code src="./demo/icon.tsx">按钮图标</code>
<code src="./demo/icon-placement.tsx" version="5.17.0">按钮图标位置</code>
<code src="./demo/debug-icon.tsx" debug>调试图标按钮</code>
<code src="./demo/debug-block.tsx" debug>调试按钮block属性</code>
<code src="./demo/size.tsx">按钮尺寸</code>
<code src="./demo/disabled.tsx">不可用状态</code>
<code src="./demo/loading.tsx">加载中状态</code>
<code src="./demo/multiple.tsx">多个按钮组合</code>
<code src="./demo/ghost.tsx">幽灵按钮</code>
<code src="./demo/danger.tsx">危险按钮</code>
<code src="./demo/block.tsx">Block 按钮</code>
<code src="./demo/legacy-group.tsx" debug>废弃的 Block 组</code>
<code src="./demo/chinese-chars-loading.tsx" debug>加载中状态 bug 还原</code>
<code src="./demo/component-token.tsx" debug>组件 Token</code>
<code src="./demo/linear-gradient.tsx">渐变按钮</code>
<code src="./demo/chinese-space.tsx" version="5.17.0">移除两个汉字之间的空格</code>
<code src="./demo/custom-disabled-bg.tsx">自定义禁用样式背景</code>
<code src="./demo/style-class.tsx" version="6.0.0">自定义语义结构的样式和类</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：`type` -> `shape` -> `size` -> `loading` -> `disabled`。

按钮的属性说明如下：

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| autoInsertSpace | 我们默认提供两个汉字之间的空格，可以设置 `autoInsertSpace` 为 `false` 关闭 | boolean | `true` | 5.17.0 |
| block | 将按钮宽度调整为其父宽度的选项 | boolean | false |  |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| color | 设置按钮的颜色 | `default` \| `primary` \| `danger` \| [PresetColors](#presetcolors) | - | `default`、`primary` 和 `danger`: 5.21.0, `PresetColors`: 5.23.0 |
| danger | 语法糖，设置危险按钮。当设置 `color` 时会以后者为准 | boolean | false |  |
| disabled | 设置按钮失效状态 | boolean | false |  |
| ghost | 幽灵属性，使按钮背景透明 | boolean | false |  |
| href | 点击跳转的地址，指定此属性 button 的行为和 a 链接一致 | string | - |  |
| htmlType | 设置 `button` 原生的 `type` 值，可选值请参考 [HTML 标准](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/button#type) | `submit` \| `reset` \| `button` | `button` |  |
| icon | 设置按钮的图标组件 | ReactNode | - |  |
| ~~iconPosition~~ | 设置按钮图标组件的位置,请使用 `iconPlacement` 替换 | `start` \| `end` | `start` | 5.17.0 |
| iconPlacement | 设置按钮图标组件的位置 | `start` \| `end` | `start` | - |
| loading | 设置按钮载入状态 | boolean \| { delay: number, icon: ReactNode } | false | icon: 5.23.0 |
| shape | 设置按钮形状 | `default` \| `circle` \| `round` | `default` |  |
| size | 设置按钮大小 | `large` \| `middle` \| `small` | `middle` |  |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| target | 相当于 a 链接的 target 属性，href 存在时生效 | string | - |  |
| type | 语法糖，设置按钮类型。当设置 `variant` 与 `color` 时以后者为准 | `primary` \| `dashed` \| `link` \| `text` \| `default` | `default` |  |
| onClick | 点击按钮时的回调 | (event: React.MouseEvent<HTMLElement, MouseEvent>) => void | - |  |
| variant | 设置按钮的变体 | `outlined` \| `dashed` \| `solid` \| `filled` \| `text` \| `link` | - | 5.21.0 |

支持原生 button 的其他所有属性。

### PresetColors

> type PresetColors = 'blue' | 'purple' | 'cyan' | 'green' | 'magenta' | 'pink' | 'red' | 'orange' | 'yellow' | 'volcano' | 'geekblue' | 'lime' | 'gold';

## Semantic DOM

<!-- prettier-ignore -->
<code src="./demo/_semantic.tsx" simplify="true"></code>

## 主题变量（Design Token）{#design-token}

<ComponentTokenTable component="Button"></ComponentTokenTable>

## FAQ

### 类型和颜色与变体如何选择？ {#faq-type-color-variant}

类型本质上是颜色与变体的语法糖，内部为其提供了一组颜色与变体的映射关系。如果两者同时存在，优先使用颜色与变体。

```jsx
<Button type="primary">click</Button>
```

等同于

```jsx
<Button color="primary" variant="solid">
  click
</Button>
```

### 如何关闭点击波纹效果？ {#faq-close-wave-effect}

如果你不需要这个特性，可以设置 [ConfigProvider](/components/config-provider-cn#api) 的 `wave` 的 `disabled` 为 `true`。

```jsx
<ConfigProvider wave={{ disabled: true }}>
  <Button>click</Button>
</ConfigProvider>
```

<style>
.site-button-ghost-wrapper {
  padding: 16px;
  background: rgb(190, 200, 200);
}
</style>

## 设计指引 {#design-guide}

- [我的按钮究竟该放哪儿！？| Ant Design 4.0 系列分享](https://zhuanlan.zhihu.com/p/109644406)
