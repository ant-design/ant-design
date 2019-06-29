---
category: Components
subtitle: 标签页
type: 数据展示
title: Tabs
cols: 1
---

选项卡切换组件。

## 何时使用

提供平级的区域将大块内容进行收纳和展现，保持界面整洁。

Ant Design 依次提供了三级选项卡，分别用于不同的场景。

- 卡片式的页签，提供可关闭的样式，常用于容器顶部。
- 标准线条式页签，用于容器内部的主功能切换，这是最常用的 Tabs。
- [RadioButton](/components/radio/#components-radio-demo-radiobutton) 可作为更次级的页签来使用。

## API

### Tabs

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| activeKey | 当前激活 tab 面板的 key | string | 无 | 3.0.0 |
| animated | 是否使用动画切换 Tabs，在 `tabPosition=top|bottom` 时有效 | boolean \| {inkBar:boolean, tabPane:boolean} | true, 当 type="card" 时为 false | 3.0.0 |
| renderTabBar | 替换 TabBar，用于二次封装标签头 | (props: DefaultTabBarProps, DefaultTabBar: React.ReactNode) => React.ReactNode | 无 | 3.9.0 |
| defaultActiveKey | 初始化选中面板的 key，如果没有设置 activeKey | string | 第一个面板 | 3.0.0 |
| hideAdd | 是否隐藏加号图标，在 `type="editable-card"` 时有效 | boolean | false | 3.0.0 |
| size | 大小，提供 `large` `default` 和 `small` 三种大小 | string | 'default' | 3.0.0 |
| tabBarExtraContent | tab bar 上额外的元素 | React.ReactNode | 无 | 3.0.0 |
| tabBarGutter | tabs 之间的间隙 | number | 无 | 3.2.0 |
| tabBarStyle | tab bar 的样式对象 | object | - | 3.0.0 |
| tabPosition | 页签位置，可选值有 `top` `right` `bottom` `left` | string | 'top' | 3.0.0 |
| type | 页签的基本样式，可选 `line`、`card` `editable-card` 类型 | string | 'line' | 3.0.0 |
| onChange | 切换面板的回调 | Function(activeKey) {} | 无 | 3.0.0 |
| onEdit | 新增和删除页签的回调，在 `type="editable-card"` 时有效 | (targetKey, action): void | 无 | 3.0.0 |
| onNextClick | next 按钮被点击的回调 | Function | 无 | 3.0.0 |
| onPrevClick | prev 按钮被点击的回调 | Function | 无 | 3.0.0 |
| onTabClick | tab 被点击的回调 | Function | 无 | 3.0.0 |

### Tabs.TabPane

| 参数        | 说明                      | 类型              | 默认值 | 版本  |
| ----------- | ------------------------- | ----------------- | ------ | ----- |
| forceRender | 被隐藏时是否渲染 DOM 结构 | boolean           | false  | 3.0.0 |
| key         | 对应 activeKey            | string            | 无     | 3.0.0 |
| tab         | 选项卡头显示文字          | string\|ReactNode | 无     | 3.0.0 |
