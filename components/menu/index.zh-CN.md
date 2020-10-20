---
category: Components
cols: 1
type: 导航
title: Menu
subtitle: 导航菜单
cover: https://gw.alipayobjects.com/zos/alicdn/3XZcjGpvK/Menu.svg
---

为页面和功能提供导航的菜单列表。

## 何时使用

导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航，顶部导航提供全局性的类目和功能，侧边导航提供多级结构来收纳和排列网站架构。

更多布局和导航的使用可以参考：[通用布局](/components/layout)。

## API

```jsx
<Menu>
  <Menu.Item>菜单项</Menu.Item>
  <SubMenu title="子菜单">
    <Menu.Item>子菜单项</Menu.Item>
  </SubMenu>
</Menu>
```

### Menu

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| defaultOpenKeys | 初始展开的 SubMenu 菜单项 key 数组 | string\[] | - |  |
| defaultSelectedKeys | 初始选中的菜单项 key 数组 | string\[] | - |  |
| forceSubMenuRender | 在子菜单展示之前就渲染进 DOM | boolean | false |  |
| inlineCollapsed | inline 时菜单是否收起状态 | boolean | - |  |
| inlineIndent | inline 模式的菜单缩进宽度 | number | 24 |  |
| mode | 菜单类型，现在支持垂直、水平、和内嵌模式三种 | `vertical` \| `horizontal` \| `inline` | `vertical` |  |
| multiple | 是否允许多选 | boolean | false |  |
| openKeys | 当前展开的 SubMenu 菜单项 key 数组 | string\[] | - |  |
| overflowedIndicator | 自定义 Menu 折叠时的图标 | ReactNode | - |  |
| selectable | 是否允许选中 | boolean | true |  |
| selectedKeys | 当前选中的菜单项 key 数组 | string\[] | - |  |
| style | 根节点样式 | CSSProperties | - |  |
| subMenuCloseDelay | 用户鼠标离开子菜单后关闭延时，单位：秒 | number | 0.1 |  |
| subMenuOpenDelay | 用户鼠标进入子菜单后开启延时，单位：秒 | number | 0 |  |
| theme | 主题颜色 | `light` \| `dark` | `light` |  |
| triggerSubMenuAction | SubMenu 展开/关闭的触发行为 | `hover` \| `click` | `hover` |  |
| onClick | 点击 MenuItem 调用此函数 | function({ item, key, keyPath, domEvent }) | - |  |
| onDeselect | 取消选中时调用，仅在 multiple 生效 | function({ item, key, keyPath, selectedKeys, domEvent }) | - |  |
| onOpenChange | SubMenu 展开/关闭的回调 | function(openKeys: string\[]) | - |  |
| onSelect | 被选中时调用 | function({ item, key, keyPath, selectedKeys, domEvent }) | -   |  |

> 更多属性查看 [rc-menu](https://github.com/react-component/menu#api)

### Menu.Item

| 参数     | 说明                     | 类型      | 默认值 | 版本  |
| -------- | ------------------------ | --------- | ------ | ----- |
| danger   | 展示错误状态样式         | boolean   | false  | 4.3.0 |
| disabled | 是否禁用                 | boolean   | false  |       |
| icon     | 菜单图标                 | ReactNode | -      | 4.2.0 |
| key      | item 的唯一标志          | string    | -      |       |
| title    | 设置收缩时展示的悬浮标题 | string    | -      |       |

> 注意：`icon` 是 `4.2.0` 新增的属性，之前的版本请使用下面的方式定义图标。
>
> ```jsx
> <Menu.Item>
>   <PieChartOutlined />
>   <span>Option 1</span>
> </Menu.Item>
> <Menu.SubMenu
>   title={
>     <>
>       <PieChartOutlined />
>       <span>Option 2</span>
>     </>
>   }
> >
>   ...
> </Menu.SubMenu>
> ```

### Menu.SubMenu

| 参数           | 说明           | 类型                          | 默认值 | 版本  |
| -------------- | -------------- | ----------------------------- | ------ | ----- |
| children       | 子菜单的菜单项 | Array&lt;MenuItem \| SubMenu> | -      |       |
| disabled       | 是否禁用       | boolean                       | false  |       |
| icon           | 菜单图标       | ReactNode                     | -      | 4.2.0 |
| key            | 唯一标志       | string                        | -      |       |
| popupClassName | 子菜单样式     | string                        | -      |       |
| popupOffset    | 子菜单偏移量   | \[number, number]             | -      |       |
| title          | 子菜单项值     | ReactNode                     | -      |       |
| onTitleClick   | 点击子菜单标题 | function({ key, domEvent })   | -      |       |

### Menu.ItemGroup

| 参数     | 说明         | 类型        | 默认值 | 版本 |
| -------- | ------------ | ----------- | ------ | ---- |
| children | 分组的菜单项 | MenuItem\[] | -      |      |
| title    | 分组标题     | ReactNode   | -      |      |

### Menu.Divider

菜单项分割线，只用在弹出菜单内。
