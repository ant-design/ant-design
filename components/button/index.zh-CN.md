---
category: Components
title: Button
subtitle: 按钮
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*BrFMQ5s7AAQAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*Lp1kTYmSsgoAAAAAAAAAAAAADrJ8AQ/original
demo:
  cols: 2
group:
  title: 通用
  order: 1
---

按钮用于开始一个即时操作。

## 何时使用

标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。

在 Ant Design 中我们提供了五种按钮。

- 主按钮：用于主行动点，一个操作区域只能有一个主按钮。
- 默认按钮：用于没有主次之分的一组行动点。
- 虚线按钮：常用于添加操作。
- 文本按钮：用于最次级的行动点。
- 链接按钮：一般用于链接，即导航至某位置。

以及四种状态属性与上面配合使用。

- 危险：删除/移动/修改权限等危险操作，一般需要二次确认。
- 幽灵：用于背景色比较复杂的地方，常用在首页/产品页等展示场景。
- 禁用：行动点不可用的时候，一般需要文案解释。
- 加载中：用于异步操作等待反馈的时候，也可以避免多次提交。

[完整设计指南](https://ant.design/docs/spec/buttons-cn)

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">按钮类型</code>
<code src="./demo/icon.tsx">图标按钮</code>
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

## API

通用属性参考：[通用属性](/docs/react/common-props)

通过设置 Button 的属性来产生不同的按钮样式，推荐顺序为：`type` -> `shape` -> `size` -> `loading` -> `disabled`。

按钮的属性说明如下：

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| block | 将按钮宽度调整为其父宽度的选项 | boolean | false |  |
| classNames | 语义化结构 class | Record<SemanticDOM, string> | - | 5.4.0 |
| danger | 设置危险按钮 | boolean | false |  |
| disabled | 设置按钮失效状态 | boolean | false |  |
| ghost | 幽灵属性，使按钮背景透明 | boolean | false |  |
| href | 点击跳转的地址，指定此属性 button 的行为和 a 链接一致 | string | - |  |
| htmlType | 设置 `button` 原生的 `type` 值，可选值请参考 [HTML 标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) | string | `button` |  |
| icon | 设置按钮的图标组件 | ReactNode | - |  |
| loading | 设置按钮载入状态 | boolean \| { delay: number } | false |  |
| shape | 设置按钮形状 | `default` \| `circle` \| `round` | `default` |  |
| size | 设置按钮大小 | `large` \| `middle` \| `small` | `middle` |  |
| styles | 语义化结构 style | Record<SemanticDOM, CSSProperties> | - | 5.4.0 |
| target | 相当于 a 链接的 target 属性，href 存在时生效 | string | - |  |
| type | 设置按钮类型 | `primary` \| `dashed` \| `link` \| `text` \| `default` | `default` |  |
| onClick | 点击按钮时的回调 | (event: MouseEvent) => void | - |  |

支持原生 button 的其他所有属性。

### `styles` 和 `classNames` 属性

| 名称 | 说明         | 版本  |
| ---- | ------------ | ----- |
| icon | 设置图标元素 | 5.5.0 |

## 主题变量（Design Token）

<ComponentTokenTable component="Button"></ComponentTokenTable>

## FAQ

### 如何移除两个汉字之间的空格？

根据 Ant Design 设计规范要求，我们会在按钮内(文本按钮和链接按钮除外)只有两个汉字时自动添加空格，如果你不需要这个特性，可以设置 [ConfigProvider](/components/config-provider-cn#api) 的 `autoInsertSpaceInButton` 为 `false`。

```tsx
<ConfigProvider autoInsertSpaceInButton={false}>
  <Button>按钮</Button>
</ConfigProvider>
```

<img src="https://gw.alipayobjects.com/zos/antfincdn/MY%26THAPZrW/38f06cb9-293a-4b42-b183-9f443e79ffea.png" style="box-shadow: none; margin: 0" width="100px" height="64px" alt="移除两个汉字之间的空格"  />

<style>
.site-button-ghost-wrapper {
  padding: 16px;
  background: rgb(190, 200, 200);
}
</style>

## 设计指引

- [我的按钮究竟该放哪儿！？| Ant Design 4.0 系列分享](https://zhuanlan.zhihu.com/p/109644406)
