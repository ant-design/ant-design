---
category: Components
group: 数据展示
title: Collapse
subtitle: 折叠面板
cover: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*B7HKR5OBe8gAAAAAAAAAAAAADrJ8AQ/original
coverDark: https://mdn.alipayobjects.com/huamei_7uahnr/afts/img/A*sir-TK0HkWcAAAAAAAAAAAAADrJ8AQ/original
---

可以折叠/展开的内容区域。

## 何时使用

- 对复杂区域进行分组和隐藏，保持页面的整洁。
- `手风琴` 是一种特殊的折叠面板，只允许单个内容区域展开。

```jsx
// >=5.4.0 可用，推荐的写法 ✅
return (
  <Collapse
    items={[
      { key: '1', header: 'My header 1', content: 'Ant Design Collapse 1' },
      { key: '2', header: 'My header 2', content: 'Ant Design Collapse 2' },
    ]}
  />
);
// <5.4.0 可用，>=5.4.0 时不推荐 🙅🏻‍♀️
return (
  <Collapse>
    <Collapse.Panel key="1" header="My header 1">
      Ant Design Collapse 1
    </Collapse.Panel>
    <Collapse.Panel key="2" header="My header 2">
      Ant Design Collapse 2
    </Collapse.Panel>
  </Collapse>
);
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

## API

### Collapse

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| accordion | 手风琴模式 | boolean | false |  |
| activeKey | 当前激活 tab 面板的 key | string\[] \| string <br/> number\[] \| number | 默认无，accordion 模式下默认第一个元素 |  |
| bordered | 带边框风格的折叠面板 | boolean | true |  |
| collapsible | 所有子面板是否可折叠或指定可折叠触发区域 | `header` \| `icon` \| `disabled` | - | 4.9.0 |
| defaultActiveKey | 初始化选中面板的 key | string\[] \| string<br/> number\[] \| number | - |  |
| destroyInactivePanel | 销毁折叠隐藏的面板 | boolean | false |  |
| expandIcon | 自定义切换图标 | (panelProps) => ReactNode | - |  |
| expandIconPosition | 设置图标位置 | `start` \| `end` | - | 4.21.0 |
| ghost | 使折叠面板透明且无边框 | boolean | false | 4.4.0 |
| size | 设置折叠面板大小 | `large` \| `middle` \| `small` | `middle` | 5.2.0 |
| onChange | 切换面板的回调 | function | - |  |

### Collapse.Panel

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| collapsible | 是否可折叠或指定可折叠触发区域 | `header` \| `icon` \| `disabled` | - | 4.9.0 (icon: 4.24.0) |
| extra | 自定义渲染每个面板右上角的内容 | ReactNode | - |  |
| forceRender | 被隐藏时是否渲染 DOM 结构 | boolean | false |  |
| header | 面板头内容 | ReactNode | - |  |
| key | 对应 activeKey | string \| number | - |  |
| showArrow | 是否展示当前面板上的箭头（为 false 时，collapsible 不能置为 icon） | boolean | true |  |
