---
category: Components
subtitle: 下拉菜单
type: 导航
title: Dropdown
cover: https://gw.alipayobjects.com/zos/alicdn/eedWN59yJ/Dropdown.svg
---

向下弹出的列表。

## 何时使用

当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。

- 用于收罗一组命令操作。
- Select 用于选择，而 Dropdown 是命令集合。

## API

属性如下

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| arrow | 下拉框箭头是否显示 | boolean | false |  |
| disabled | 菜单是否禁用 | boolean | - |  |
| getPopupContainer | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。[示例](https://codepen.io/afc163/pen/zEjNOy?editors=0010) | (triggerNode: HTMLElement) => HTMLElement | () => document.body |  |
| overlay | 菜单 | [Menu](/components/menu) \| () => Menu | - |  |
| overlayClassName | 下拉根元素的类名称 | string | - |  |
| overlayStyle | 下拉根元素的样式 | CSSProperties | - |  |
| placement | 菜单弹出位置：`bottomLeft` `bottomCenter` `bottomRight` `topLeft` `topCenter` `topRight` | string | `bottomLeft` |  |
| trigger | 触发下拉的行为, 移动端不支持 hover | Array&lt;`click`\|`hover`\|`contextMenu`> | \[`hover`] |  |
| visible | 菜单是否显示 | boolean | - |  |
| onVisibleChange | 菜单显示状态改变时调用，参数为 `visible` | (visible: boolean) => void | - |  |

`overlay` 菜单使用 [Menu](/components/menu/)，还包括菜单项 `Menu.Item`，分割线 `Menu.Divider`。

> 注意： Menu.Item 必须设置唯一的 key 属性。
>
> Dropdown 下的 Menu 默认不可选中。如果需要菜单可选中，可以指定 `<Menu selectable>`。

### Dropdown.Button

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| buttonsRender | 自定义左右两个按钮 | (buttons: ReactNode\[]) => ReactNode\[] | - |  |
| disabled | 菜单是否禁用 | boolean | - |  |
| icon | 右侧的 icon | ReactNode | - |  |
| overlay | 菜单 | [Menu](/components/menu/) | - |  |
| placement | 菜单弹出位置：`bottomLeft` `bottomCenter` `bottomRight` `topLeft` `topCenter` `topRight` | string | `bottomLeft` |  |
| size | 按钮大小，和 [Button](/components/button/#API) 一致 | string | `default` |  |
| trigger | 触发下拉的行为 | Array&lt;`click`\|`hover`\|`contextMenu`> | \[`hover`] |  |
| type | 按钮类型，和 [Button](/components/button/#API) 一致 | string | `default` |  |
| visible | 菜单是否显示 | boolean | - |  |
| onClick | 点击左侧按钮的回调，和 [Button](/components/button/#API) 一致 | (event) => void | - |  |
| onVisibleChange | 菜单显示状态改变时调用，参数为 `visible` | (visible: boolean) => void | - |  |
