---
category: Components
group: 数据展示
title: Descriptions
subtitle: 描述列表
description: 展示多个只读字段的组合。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*fHdlTpif6XQAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*d27AQJrowGAAAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用 {#when-to-use}

常见于详情页的信息展示。

```tsx | pure
// >= 5.8.0 可用，推荐的写法 ✅

const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: 'UserName',
    children: <p>Zhou Maomao</p>,
  },
  {
    key: '2',
    label: 'Telephone',
    children: <p>1810000000</p>,
  },
  {
    key: '3',
    label: 'Live',
    children: <p>Hangzhou, Zhejiang</p>,
  },
  {
    key: '4',
    label: 'Remark',
    children: <p>empty</p>,
  },
  {
    key: '5',
    label: 'Address',
    children: <p>No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</p>,
  },
];

<Descriptions title="User Info" items={items} />;

// <5.8.0 可用，>=5.8.0 时不推荐 🙅🏻‍♀️

<Descriptions title="User Info">
  <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
  <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
  <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
  <Descriptions.Item label="Remark">empty</Descriptions.Item>
  <Descriptions.Item label="Address">
    No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
  </Descriptions.Item>
</Descriptions>;
```

## 代码演示 {#examples}

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">基本</code>
<code src="./demo/border.tsx">带边框的</code>
<code src="./demo/text.tsx" debug>复杂文本的情况</code>
<code src="./demo/padding.tsx" debug>间距</code>
<code src="./demo/size.tsx">自定义尺寸</code>
<code src="./demo/responsive.tsx">响应式</code>
<code src="./demo/vertical.tsx">垂直</code>
<code src="./demo/vertical-border.tsx">垂直带边框的</code>
<code src="./demo/style.tsx" debug>自定义 label & wrapper 样式</code>
<code src="./demo/style-class.tsx" version="6.0.0">自定义语义结构的样式和类</code>
<code src="./demo/jsx.tsx" debug>JSX demo</code>
<code src="./demo/component-token.tsx" debug>组件 Token</code>
<code src="./demo/block.tsx">整行</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

### Descriptions

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| bordered | 是否展示边框 | boolean | false |  |
| classNames | 用于自定义组件内部各语义化结构的 class，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), string> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), string> | - |  |
| colon | 配置 `Descriptions.Item` 的 `colon` 的默认值。表示是否显示 label 后面的冒号 | boolean | true |  |
| column | 一行的 `DescriptionItems` 数量，可以写成像素值或支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | number \| [Record<Breakpoint, number>](https://github.com/ant-design/ant-design/blob/84ca0d23ae52e4f0940f20b0e22eabe743f90dca/components/descriptions/index.tsx#L111C21-L111C56) | 3 |  |
| ~~contentStyle~~ | 自定义内容样式，请使用 `styles.content` 替换 | CSSProperties | - | 4.10.0 |
| extra | 描述列表的操作区域，显示在右上方 | ReactNode | - | 4.5.0 |
| items | 描述列表项内容 | [DescriptionsItem](#descriptionitem)[] | - | 5.8.0 |
| ~~labelStyle~~ | 自定义标签样式，请使用 `styles.label` 替换 | CSSProperties | - | 4.10.0 |
| layout | 描述布局 | `horizontal` \| `vertical` | `horizontal` |  |
| size | 设置列表的大小。可以设置为 `medium` 、`small`, 或不填 | `large` \| `medium` \| `small` | `large` |  |
| styles | 用于自定义组件内部各语义化结构的行内 style，支持对象或函数 | Record<[SemanticDOM](#semantic-dom), CSSProperties> \| (info: { props })=> Record<[SemanticDOM](#semantic-dom), CSSProperties> | - |  |
| title | 描述列表的标题，显示在最顶部 | ReactNode | - |  |

### DescriptionItem

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| ~~contentStyle~~ | 自定义内容样式，请使用 `styles.content` 替换 | CSSProperties | - | 4.9.0 |
| label | 内容的描述 | ReactNode | - |  |
| ~~labelStyle~~ | 自定义标签样式，请使用 `styles.label` 替换 | CSSProperties | - | 4.9.0 |
| span | 包含列的数量（`filled` 铺满当前行剩余部分） | number\| `filled` \| [Screens](/components/grid-cn#col) | 1 | `screens: 5.9.0`，`filled: 5.22.0` |

> span 是 Description.Item 的数量。 span={2} 会占用两个 DescriptionItem 的宽度。当同时配置 `style` 和 `labelStyle`（或 `contentStyle`）时，两者会同时作用。样式冲突时，后者会覆盖前者。

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## 主题变量（Design Token）{#design-token}

<ComponentTokenTable component="Descriptions"></ComponentTokenTable>
