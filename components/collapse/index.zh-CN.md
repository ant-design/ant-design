---
category: Components
group: 数据展示
title: Collapse
subtitle: 折叠面板
description: 可以折叠/展开的内容区域。
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*B7HKR5OBe8gAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*sir-TK0HkWcAAAAAAAAAAAAADrJ8AQ/original
---

## 何时使用 {#when-to-use}

- 对复杂区域进行分组和隐藏，保持页面的整洁。
- `手风琴` 是一种特殊的折叠面板，只允许单个内容区域展开。

```tsx | pure
// >= 5.6.0 可用，推荐的写法 ✅
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps['items'] = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: <p>{text}</p>,
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>,
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>,
  },
];

<Collapse items={items} defaultActiveKey={['1']} />;

// <5.6.0 可用，>=5.6.0 时不推荐 🙅🏻‍♀️

<Collapse defaultActiveKey={['1']} onChange={onChange}>
  <Panel header="This is panel header 1" key="1">
    <p>{text}</p>
  </Panel>
  <Panel header="This is panel header 2" key="2">
    <p>{text}</p>
  </Panel>
  <Panel header="This is panel header 3" key="3">
    <p>{text}</p>
  </Panel>
</Collapse>;
```

## 代码演示

<!-- prettier-ignore -->
<code src="./demo/basic.tsx">折叠面板</code>
<code src="./demo/size.tsx">面板尺寸</code>
<code src="./demo/accordion.tsx">手风琴</code>
<code src="./demo/mix.tsx">面板嵌套</code>
<code src="./demo/borderless.tsx">简洁风格</code>
<code src="./demo/custom.tsx">自定义面板</code>
<code src="./demo/noarrow.tsx">隐藏箭头</code>
<code src="./demo/extra.tsx">额外节点</code>
<code src="./demo/ghost.tsx">幽灵折叠面板</code>
<code src="./demo/collapsible.tsx">可折叠触发区域</code>
<code src="./demo/component-token.tsx" debug>组件 Token</code>
<code src="./demo/style-class.tsx">自定义样式</code>

## API

通用属性参考：[通用属性](/docs/react/common-props)

### Collapse

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| accordion | 手风琴模式 | boolean | false |  |
| activeKey | 当前激活 tab 面板的 key | string\[] \| string <br/> number\[] \| number | [手风琴模式](#collapse-demo-accordion)下默认第一个元素 |  |
| bordered | 带边框风格的折叠面板 | boolean | true |  |
| classNames | 语义化结构 class | [Record<SemanticDOM, string>](#semantic-dom) | - | 6.0.0 |
| collapsible | 所有子面板是否可折叠或指定可折叠触发区域 | `header` \| `icon` \| `disabled` | - | 4.9.0 |
| defaultActiveKey | 初始化选中面板的 key | string\[] \| string<br/> number\[] \| number | - |  |
| ~~destroyInactivePanel~~ | 销毁折叠隐藏的面板 | boolean | false |  |
| destroyOnHidden | 销毁折叠隐藏的面板 | boolean | false | 5.25.0 |
| expandIcon | 自定义切换图标 | (panelProps) => ReactNode | - |  |
| expandIconPlacement | 设置图标位置 | `start` \| `end` | `start` | - |
| ~~expandIconPosition~~ | 设置图标位置，请使用 `expandIconPlacement` 替换 | `start` \| `end` | - | 4.21.0 |
| ghost | 使折叠面板透明且无边框 | boolean | false | 4.4.0 |
| size | 设置折叠面板大小 | `large` \| `middle` \| `small` | `middle` | 5.2.0 |
| styles | 语义化结构 style | [Record<SemanticDOM, CSSProperties>](#semantic-dom) | - | 6.0.0 |
| onChange | 切换面板的回调 | function | - |  |
| items | 折叠项目内容 | [ItemType](#itemtype) | - | 5.6.0 |

### ItemType

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| classNames | 语义化结构 className | [`Record<header \| body, string>`](#semantic-dom) | - | 5.21.0 |
| collapsible | 是否可折叠或指定可折叠触发区域 | `header` \| `icon` \| `disabled` | - |  |
| children | body 区域内容 | ReactNode | - |  |
| extra | 自定义渲染每个面板右上角的内容 | ReactNode | - |  |
| forceRender | 被隐藏时是否渲染 body 区域 DOM 结构 | boolean | false |  |
| key | 对应 activeKey | string \| number | - |  |
| label | 面板标题 | ReactNode | - | - |
| showArrow | 是否展示当前面板上的箭头（为 false 时，collapsible 不能设为 icon） | boolean | true |  |
| styles | 语义化结构 style | [`Record<header \| body, CSSProperties>`](#semantic-dom) | - | 5.21.0 |

### Collapse.Panel

<!-- prettier-ignore -->
:::warning{title=已废弃}
版本 >= 5.6.0 时请使用 items 方式配置面板。
:::

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| collapsible | 是否可折叠或指定可折叠触发区域 | `header` \| `icon` \| `disabled` | - | 4.9.0 (icon: 4.24.0) |
| extra | 自定义渲染每个面板右上角的内容 | ReactNode | - |  |
| forceRender | 被隐藏时是否渲染 body 区域 DOM 结构 | boolean | false |  |
| header | 面板标题 | ReactNode | - |  |
| key | 对应 activeKey | string \| number | - |  |
| showArrow | 是否展示当前面板上的箭头（为 false 时，collapsible 不能设为 icon） | boolean | true |  |

## Semantic DOM

<code src="./demo/_semantic.tsx" simplify="true"></code>

## 主题变量（Design Token）

<ComponentTokenTable component="Collapse"></ComponentTokenTable>
