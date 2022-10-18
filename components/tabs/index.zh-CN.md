---
category: Components
subtitle: 标签页
group: 数据展示
title: Tabs
cover: https://gw.alipayobjects.com/zos/antfincdn/lkI2hNEDr2V/Tabs.svg
demo:
  cols: 2
---

选项卡切换组件。

## 何时使用

提供平级的区域将大块内容进行收纳和展现，保持界面整洁。

Ant Design 依次提供了三级选项卡，分别用于不同的场景。

- 卡片式的页签，提供可关闭的样式，常用于容器顶部。
- 既可用于容器顶部，也可用于容器内部，是最通用的 Tabs。
- [Radio.Button](/components/radio/#components-radio-demo-radiobutton) 可作为更次级的页签来使用。

### 4.23.0 用法升级

```__react
import Alert from '../alert';
ReactDOM.render(<Alert message="在 4.23.0 版本后，我们提供了 <Tabs items={[...]} /> 的简写方式，有更好的性能和更方便的数据组织方式，开发者不再需要自行拼接 JSX。同时我们废弃了原先的写法，你还是可以在 4.x 继续使用，但会在控制台看到警告，并会在 5.0 后移除。" />, mountNode);
```

```jsx
// >=4.23.0 可用，推荐的写法 ✅
const items = [
  { label: '项目 1', key: 'item-1', children: '内容 1' }, // 务必填写 key
  { label: '项目 2', key: 'item-2', children: '内容 2' },
];
return <Tabs items={items} />;

// <4.23.0 可用，>=4.23.0 时不推荐 🙅🏻‍♀️
<Tabs>
  <Tabs.TabPane tab="项目 1" key="item-1">
    内容 1
  </Tabs.TabPane>
  <Tabs.TabPane tab="项目 2" key="item-2">
    内容 2
  </Tabs.TabPane>
</Tabs>;
```

## 代码演示

<code src="./demo/deprecated.tsx">基础用法（废弃的语法糖）</code>
<code src="./demo/basic.tsx">基本</code>
<code src="./demo/disabled.tsx">禁用</code>
<code src="./demo/centered.tsx">居中</code>
<code src="./demo/icon.tsx">图标</code>
<code src="./demo/slide.tsx">滑动</code>
<code src="./demo/extra.tsx">附加内容</code>
<code src="./demo/size.tsx">大小</code>
<code src="./demo/position.tsx">位置</code>
<code src="./demo/card.tsx">卡片式页签</code>
<code src="./demo/editable-card.tsx">新增和关闭页签</code>
<code src="./demo/card-top.tsx">卡片式页签容器</code>
<code src="./demo/custom-add-trigger.tsx">自定义新增页签触发器</code>
<code src="./demo/custom-tab-bar.tsx">自定义页签头</code>
<code src="./demo/custom-tab-bar-node.tsx">可拖拽标签</code>
<code src="./demo/animated.tsx">动画</code>
<code src="./demo/nest.tsx">嵌套</code>

## 代码演示

<code src="./demo/deprecated.tsx">基础用法（废弃的语法糖）</code>
<code src="./demo/basic.tsx">基本</code>
<code src="./demo/disabled.tsx">禁用</code>
<code src="./demo/centered.tsx">居中</code>
<code src="./demo/icon.tsx">图标</code>
<code src="./demo/slide.tsx">滑动</code>
<code src="./demo/extra.tsx">附加内容</code>
<code src="./demo/size.tsx">大小</code>
<code src="./demo/position.tsx">位置</code>
<code src="./demo/card.tsx">卡片式页签</code>
<code src="./demo/editable-card.tsx">新增和关闭页签</code>
<code src="./demo/card-top.tsx">卡片式页签容器</code>
<code src="./demo/custom-add-trigger.tsx">自定义新增页签触发器</code>
<code src="./demo/custom-tab-bar.tsx">自定义页签头</code>
<code src="./demo/custom-tab-bar-node.tsx">可拖拽标签</code>
<code src="./demo/animated.tsx">动画</code>
<code src="./demo/nest.tsx">嵌套</code>

## API

### Tabs

| 参数                   | 说明                                                     | 类型                                                                                   | 默认值                           | 版本          |
| ---------------------- | -------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------- | ------------- |
| activeKey              | 当前激活 tab 面板的 key                                  | string                                                                                 | -                                |               |
| addIcon                | 自定义添加按钮                                           | ReactNode                                                                              | -                                | 4.4.0         |
| animated               | 是否使用动画切换 Tabs, 仅生效于 `tabPosition="top"`      | boolean\| { inkBar: boolean, tabPane: boolean }                                        | { inkBar: true, tabPane: false } |               |
| centered               | 标签居中展示                                             | boolean                                                                                | false                            | 4.4.0         |
| defaultActiveKey       | 初始化选中面板的 key，如果没有设置 activeKey             | string                                                                                 | `第一个面板`                     |               |
| hideAdd                | 是否隐藏加号图标，在 `type="editable-card"` 时有效       | boolean                                                                                | false                            |               |
| items                  | 配置选项卡内容                                           | [TabItemType](#TabItemType)                                                            | []                               | 4.23.0        |
| moreIcon               | 自定义折叠 icon                                          | ReactNode                                                                              | &lt;EllipsisOutlined />          | 4.14.0        |
| popupClassName         | 更多菜单的 `className`                                   | string                                                                                 | -                                | 4.21.0        |
| renderTabBar           | 替换 TabBar，用于二次封装标签头                          | (props: DefaultTabBarProps, DefaultTabBar: React.ComponentClass) => React.ReactElement | -                                |               |
| size                   | 大小，提供 `large` `middle` 和 `small` 三种大小          | string                                                                                 | `middle`                         |               |
| tabBarExtraContent     | tab bar 上额外的元素                                     | ReactNode \| {left?: ReactNode, right?: ReactNode}                                     | -                                | object: 4.6.0 |
| tabBarGutter           | tabs 之间的间隙                                          | number                                                                                 | -                                |               |
| tabBarStyle            | tab bar 的样式对象                                       | CSSProperties                                                                          | -                                |               |
| tabPosition            | 页签位置，可选值有 `top` `right` `bottom` `left`         | string                                                                                 | `top`                            |               |
| destroyInactiveTabPane | 被隐藏时是否销毁 DOM 结构                                | boolean                                                                                | false                            |               |
| type                   | 页签的基本样式，可选 `line`、`card` `editable-card` 类型 | string                                                                                 | `line`                           |               |
| onChange               | 切换面板的回调                                           | function(activeKey) {}                                                                 | -                                |               |
| onEdit                 | 新增和删除页签的回调，在 `type="editable-card"` 时有效   | (action === 'add' ? event : targetKey, action): void                                   | -                                |               |
| onTabClick             | tab 被点击的回调                                         | function(key: string, event: MouseEvent)                                               | -                                |               |
| onTabScroll            | tab 滚动时触发                                           | function({ direction: `left` \| `right` \| `top` \| `bottom` })                        | -                                | 4.3.0         |

> 更多属性查看 [rc-tabs tabs](https://github.com/react-component/tabs#tabs)

### TabItemType

| 参数        | 说明                                            | 类型      | 默认值 |
| ----------- | ----------------------------------------------- | --------- | ------ |
| closeIcon   | 自定义关闭图标，`在 type="editable-card"`时有效 | ReactNode | -      |
| disabled    | 禁用某一项                                      | boolean   | false  |
| forceRender | 被隐藏时是否渲染 DOM 结构                       | boolean   | false  |
| key         | 对应 activeKey                                  | string    | -      |
| label       | 选项卡头显示文字                                | ReactNode | -      |
| children    | 选项卡头显示内容                                | ReactNode | -      |
