---
category: Components
subtitle: 标签页
type: 数据展示
title: Tabs
cols: 1
cover: https://gw.alipayobjects.com/zos/antfincdn/lkI2hNEDr2V/Tabs.svg
---

选项卡切换组件。

## 何时使用

提供平级的区域将大块内容进行收纳和展现，保持界面整洁。

Ant Design 依次提供了三级选项卡，分别用于不同的场景。

- 卡片式的页签，提供可关闭的样式，常用于容器顶部。
- 既可用于容器顶部，也可用于容器内部，是最通用的 Tabs。
- [Radio.Button](/components/radio/#components-radio-demo-radiobutton) 可作为更次级的页签来使用。

## API

### Tabs

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| activeKey | 当前激活 tab 面板的 key | string | - |  |
| addIcon | 自定义添加按钮 | ReactNode | - | 4.4.0 |
| animated | 是否使用动画切换 Tabs, 仅生效于 `tabPosition="top"` | boolean \| { inkBar: boolean, tabPane: boolean } | { inkBar: true, tabPane: false } |  |
| centered | 标签居中展示 | boolean | false | 4.4.0 |
| defaultActiveKey | 初始化选中面板的 key，如果没有设置 activeKey | string | `第一个面板` |  |
| hideAdd | 是否隐藏加号图标，在 `type="editable-card"` 时有效 | boolean | false |  |
| renderTabBar | 替换 TabBar，用于二次封装标签头 | (props: DefaultTabBarProps, DefaultTabBar: React.ComponentClass) => React.ReactElement | - |  |
| size | 大小，提供 `large` `default` 和 `small` 三种大小 | string | `default` |  |
| tabBarExtraContent | tab bar 上额外的元素 | ReactNode \| {left?: ReactNode, right?: ReactNode} | - | object: 4.6.0 |
| tabBarGutter | tabs 之间的间隙 | number | - |  |
| tabBarStyle | tab bar 的样式对象 | object | - |  |
| tabPosition | 页签位置，可选值有 `top` `right` `bottom` `left` | string | `top` |  |
| type | 页签的基本样式，可选 `line`、`card` `editable-card` 类型 | string | `line` |  |
| onChange | 切换面板的回调 | function(activeKey) {} | - |  |
| onEdit | 新增和删除页签的回调，在 `type="editable-card"` 时有效 | (targetKey, action): void | - |  |
| onTabClick | tab 被点击的回调 | function(key: string, event: MouseEvent) | - |  |
| onTabScroll | tab 滚动时触发 | function({ direction: `left` \| `right` \| `top` \| `bottom` }) | - | 4.3.0 |

### Tabs.TabPane

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| closeIcon | 自定义关闭图标，`在 type="editable-card"`时有效 | ReactNode | - |
| forceRender | 被隐藏时是否渲染 DOM 结构 | boolean | false |
| key | 对应 activeKey | string | - |
| tab | 选项卡头显示文字 | ReactNode | - |
